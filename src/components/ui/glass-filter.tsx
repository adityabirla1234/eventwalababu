/**
 * Shared SVG filter that powers the "liquid glass" distortion effect used by
 * `LiquidButton` and the glass-shell variants of the site's `Button`
 * component. Renders once (mounted in `AppLayout`) so every glass button on
 * a page references the same `#liquid-glass-distortion` filter instead of
 * each instance stamping out its own duplicate (invalid) SVG id.
 */
export function GlassFilter() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <defs>
        <filter
          id="liquid-glass-distortion"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          {/* Turbulent noise field used to displace the backdrop */}
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          {/* Soften the noise slightly before using it as a displacement map */}
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          {/* Displace the backdrop using the noise field */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          {/* Final soft blur for the frosted look */}
          <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}
