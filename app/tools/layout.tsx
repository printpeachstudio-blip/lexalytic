import './tool.css'

/**
 * Every tool under /tools gets the shared stylesheet from here, so no tool
 * needs its own inline style block for the common parts.
 */
export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
