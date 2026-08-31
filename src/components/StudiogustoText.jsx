import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  attribute vec2 aUv;

  varying vec2 vUv;

  void main() {
    vUv = aUv;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  uniform float uActive;
  uniform float uTime;
  uniform float uAspect;
  uniform float uRadius;
  uniform float uStrength;
  uniform float uChromatic;

  void main() {
    vec2 deltaUv = vUv - uMouse;
    vec2 deltaScreen = vec2(deltaUv.x * uAspect, deltaUv.y);
    float distanceFromPointer = length(deltaScreen);

    float influence = 1.0 - smoothstep(0.0, uRadius, distanceFromPointer);
    influence = influence * influence * uActive;

    vec2 radialScreen = normalize(deltaScreen + vec2(0.00001));
    vec2 radialUv = vec2(
      radialScreen.x / max(uAspect, 0.00001),
      radialScreen.y
    );

    vec2 velocityScreen = vec2(uVelocity.x * uAspect, uVelocity.y);
    float speed = clamp(length(velocityScreen) * 7.5, 0.0, 1.0);
    vec2 velocityDirectionScreen = normalize(
      velocityScreen + vec2(0.00001)
    );
    vec2 velocityDirectionUv = vec2(
      velocityDirectionScreen.x / max(uAspect, 0.00001),
      velocityDirectionScreen.y
    );

    float pulse = sin(distanceFromPointer * 34.0 - uTime * 4.2);
    vec2 ripple =
      radialUv * pulse * 0.0028 * influence * (0.18 + speed);

    vec2 bulge =
      radialUv * influence * (0.010 + speed * 0.034) * uStrength;
    vec2 drag =
      velocityDirectionUv * influence * speed * 0.030 * uStrength;
    vec2 distortedUv = vUv - bulge - drag + ripple;

    vec2 chromaOffset =
      velocityDirectionUv * influence * speed * 0.047 * uChromatic;

    float red = texture2D(uTexture, distortedUv + chromaOffset).a;
    float green = texture2D(uTexture, distortedUv).a;
    float blue = texture2D(uTexture, distortedUv - chromaOffset).a;
    float alpha = max(red, max(green, blue));

    gl_FragColor = vec4(red, green, blue, alpha);
  }
`;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("StudiogustoText shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    FRAGMENT_SHADER
  );

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("StudiogustoText program error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function drawLetterSpacedText({
  context,
  text,
  x,
  baseline,
  letterSpacing,
  horizontalScale,
}) {
  context.save();
  context.translate(x, 0);
  context.scale(horizontalScale, 1);

  let cursorX = 0;
  const characters = Array.from(text);

  characters.forEach((character, index) => {
    context.fillText(character, cursorX, baseline);
    cursorX += context.measureText(character).width;

    if (index < characters.length - 1) {
      cursorX += letterSpacing / horizontalScale;
    }
  });

  context.restore();
}

/**
 * Wordmark WebGL con fallback DOM sempre disponibile.
 * Se WebGL o lo shader non partono, la scritta normale resta visibile.
 */
export default function StudiogustoText({
  text,
  radius = 0.92,
  strength = 1,
  chromatic = 1,
  className = "",
}) {
  const hostRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const textNode = textRef.current;
    const canvas = canvasRef.current;

    if (!host || !textNode || !canvas || typeof window === "undefined") {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia("(any-pointer: fine)").matches;

    // Su touch o reduced motion resta semplicemente il testo DOM.
    if (reducedMotion || !hasFinePointer) {
      setWebglReady(false);
      return undefined;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      setWebglReady(false);
      return undefined;
    }

    const program = createProgram(gl);
    if (!program) {
      setWebglReady(false);
      return undefined;
    }

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const uvLocation = gl.getAttribLocation(program, "aUv");

    const uniforms = {
      texture: gl.getUniformLocation(program, "uTexture"),
      mouse: gl.getUniformLocation(program, "uMouse"),
      velocity: gl.getUniformLocation(program, "uVelocity"),
      active: gl.getUniformLocation(program, "uActive"),
      time: gl.getUniformLocation(program, "uTime"),
      aspect: gl.getUniformLocation(program, "uAspect"),
      radius: gl.getUniformLocation(program, "uRadius"),
      strength: gl.getUniformLocation(program, "uStrength"),
      chromatic: gl.getUniformLocation(program, "uChromatic"),
    };

    const geometryBuffer = gl.createBuffer();
    const texture = gl.createTexture();

    if (
      !geometryBuffer ||
      !texture ||
      positionLocation < 0 ||
      uvLocation < 0
    ) {
      gl.deleteProgram(program);
      setWebglReady(false);
      return undefined;
    }

    const geometry = new Float32Array([
      -1, -1, 0, 0,
       1, -1, 1, 0,
      -1,  1, 0, 1,
      -1,  1, 0, 1,
       1, -1, 1, 0,
       1,  1, 1, 1,
    ]);

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, geometryBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(
      positionLocation,
      2,
      gl.FLOAT,
      false,
      4 * Float32Array.BYTES_PER_ELEMENT,
      0
    );

    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(
      uvLocation,
      2,
      gl.FLOAT,
      false,
      4 * Float32Array.BYTES_PER_ELEMENT,
      2 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0);

    gl.uniform1i(uniforms.texture, 0);
    gl.uniform1f(uniforms.radius, radius);
    gl.uniform1f(uniforms.strength, strength);
    gl.uniform1f(uniforms.chromatic, chromatic);

    const sourceCanvas = document.createElement("canvas");
    const sourceContext = sourceCanvas.getContext("2d");

    if (!sourceContext) {
      gl.deleteTexture(texture);
      gl.deleteBuffer(geometryBuffer);
      gl.deleteProgram(program);
      setWebglReady(false);
      return undefined;
    }

    let aspect = 1;
    let animationFrame = 0;
    let disposed = false;
    let pointerInside = false;
    let targetActive = 0;
    let active = 0;
    let textureUploaded = false;
    let readyPublished = false;
    let lastPointerTime = performance.now();
    let lastPointer = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };
    let smoothMouse = { x: 0.5, y: 0.5 };
    let targetVelocity = { x: 0, y: 0 };
    let smoothVelocity = { x: 0, y: 0 };

    const uploadTextTexture = () => {
      if (disposed) return;

      const hostRect = host.getBoundingClientRect();
      const textRect = textNode.getBoundingClientRect();
      const layoutWidth = hostRect.width;
      const layoutHeight = hostRect.height;

      if (layoutWidth < 2 || layoutHeight < 2) {
        textureUploaded = false;
        setWebglReady(false);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const cssWidth = Math.max(1, Math.ceil(layoutWidth));
      const cssHeight = Math.max(1, Math.ceil(layoutHeight));
      aspect = cssWidth / cssHeight;

      const pixelWidth = Math.max(1, Math.round(cssWidth * dpr));
      const pixelHeight = Math.max(1, Math.round(cssHeight * dpr));

      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      sourceCanvas.width = pixelWidth;
      sourceCanvas.height = pixelHeight;
      gl.viewport(0, 0, pixelWidth, pixelHeight);

      const computedStyle = window.getComputedStyle(textNode);
      const fontSize = Number.parseFloat(computedStyle.fontSize) || 16;
      const parsedLetterSpacing = Number.parseFloat(
        computedStyle.letterSpacing
      );
      const letterSpacing = Number.isFinite(parsedLetterSpacing)
        ? parsedLetterSpacing
        : 0;
      const fontStyle = computedStyle.fontStyle || "normal";
      const fontWeight = computedStyle.fontWeight || "400";
      const fontFamily = computedStyle.fontFamily || "sans-serif";

      sourceContext.setTransform(1, 0, 0, 1, 0, 0);
      sourceContext.clearRect(0, 0, pixelWidth, pixelHeight);
      sourceContext.scale(dpr, dpr);
      sourceContext.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
      sourceContext.textAlign = "left";
      sourceContext.textBaseline = "alphabetic";
      sourceContext.fillStyle = "#ffffff";
      sourceContext.imageSmoothingEnabled = true;

      const characters = Array.from(text);
      const measuredWidth = characters.reduce(
        (total, character, index) => {
          const spacing = index < characters.length - 1 ? letterSpacing : 0;
          return total + sourceContext.measureText(character).width + spacing;
        },
        0
      );

      const expectedTextWidth = Math.max(1, textRect.width);
      const horizontalScale = clamp(
        expectedTextWidth / Math.max(1, measuredWidth),
        0.68,
        1.34
      );

      const metrics = sourceContext.measureText(text);
      const ascent =
        metrics.actualBoundingBoxAscent || Math.max(1, fontSize * 0.8);
      const descent =
        metrics.actualBoundingBoxDescent || Math.max(1, fontSize * 0.18);

      const textX = textRect.left - hostRect.left;
      const textTop = textRect.top - hostRect.top;
      const textHeight = Math.max(1, textRect.height);
      const baseline = textTop + (textHeight + ascent - descent) * 0.5;

      drawLetterSpacedText({
        context: sourceContext,
        text,
        x: textX,
        baseline,
        letterSpacing,
        horizontalScale,
      });

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        sourceCanvas
      );

      gl.uniform1f(uniforms.aspect, aspect);
      textureUploaded = true;
    };

    const updatePointer = (event) => {
      const rect = host.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      aspect = rect.width / rect.height;
      const now = performance.now();
      const deltaTime = clamp(now - lastPointerTime, 8, 48);
      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1);
      const frameCorrection = 16.667 / deltaTime;

      targetVelocity.x = clamp(
        (x - lastPointer.x) * frameCorrection,
        -0.12,
        0.12
      );
      targetVelocity.y = clamp(
        (y - lastPointer.y) * frameCorrection,
        -0.12,
        0.12
      );

      targetMouse = { x, y };
      lastPointer = { x, y };
      lastPointerTime = now;
      targetActive = 1;
      pointerInside = true;
    };

    const handlePointerEnter = (event) => {
      const rect = host.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      aspect = rect.width / rect.height;
      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1);

      lastPointer = { x, y };
      targetMouse = { x, y };
      smoothMouse = { x, y };
      targetVelocity = { x: 0, y: 0 };
      lastPointerTime = performance.now();
      targetActive = 1;
      pointerInside = true;
    };

    const handlePointerLeave = () => {
      pointerInside = false;
      targetActive = 0;
      targetVelocity = { x: 0, y: 0 };
    };

    const render = (time) => {
      if (disposed) return;

      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.19;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.19;

      smoothVelocity.x += (targetVelocity.x - smoothVelocity.x) * 0.24;
      smoothVelocity.y += (targetVelocity.y - smoothVelocity.y) * 0.24;

      targetVelocity.x *= pointerInside ? 0.82 : 0.68;
      targetVelocity.y *= pointerInside ? 0.82 : 0.68;
      smoothVelocity.x *= pointerInside ? 0.965 : 0.89;
      smoothVelocity.y *= pointerInside ? 0.965 : 0.89;

      active +=
        (targetActive - active) * (targetActive > active ? 0.16 : 0.085);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(uniforms.mouse, smoothMouse.x, smoothMouse.y);
      gl.uniform2f(
        uniforms.velocity,
        smoothVelocity.x,
        smoothVelocity.y
      );
      gl.uniform1f(uniforms.active, active);
      gl.uniform1f(uniforms.time, time * 0.001);
      gl.uniform1f(uniforms.aspect, aspect);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Pubblica ready soltanto dopo un vero frame disegnato.
      if (textureUploaded && !readyPublished) {
        readyPublished = true;
        setWebglReady(true);
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(uploadTextTexture)
        : null;

    resizeObserver?.observe(host);
    resizeObserver?.observe(textNode);

    const handleContextLost = (event) => {
      event.preventDefault();
      textureUploaded = false;
      readyPublished = false;
      setWebglReady(false);
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    host.addEventListener("pointerenter", handlePointerEnter, {
      passive: true,
    });
    host.addEventListener("pointermove", updatePointer, { passive: true });
    host.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
    window.addEventListener("resize", uploadTextTexture, { passive: true });

    uploadTextTexture();

    if (document.fonts?.ready) {
      document.fonts.ready.then(uploadTextTexture).catch(() => {});
    }

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      host.removeEventListener("pointerenter", handlePointerEnter);
      host.removeEventListener("pointermove", updatePointer);
      host.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", uploadTextTexture);

      gl.deleteTexture(texture);
      gl.deleteBuffer(geometryBuffer);
      gl.deleteProgram(program);
    };
  }, [chromatic, radius, strength, text]);

  return (
    <span
      ref={hostRef}
      data-studiogusto-text
      data-webgl-ready={webglReady ? "true" : "false"}
      className={`relative isolate block w-full select-none overflow-visible ${className}`}
      style={{
        minHeight: "1.04em",
        marginBlock: "-0.28em",
        marginInline: "-0.1em",
        paddingBlock: "0.28em",
        paddingInline: "0.1em",
      }}
    >
      {/*
        Fallback sempre presente. Quando WebGL funziona resta appena sotto
        al canvas: non può più capitare una sezione completamente vuota.
      */}
      <span
        ref={textRef}
        aria-hidden="true"
        className="relative z-0 inline-block whitespace-nowrap"
        style={{
          opacity: webglReady ? 0.12 : 1,
          transition: "opacity 180ms ease",
        }}
      >
        {text}
      </span>

      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {text}
      </span>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        style={{
          display: "block",
          opacity: webglReady ? 1 : 0,
          visibility: webglReady ? "visible" : "hidden",
          filter: "drop-shadow(0 0 0.02em rgba(255,255,255,.18))",
          transition: "opacity 180ms ease",
        }}
      />
    </span>
  );
}
