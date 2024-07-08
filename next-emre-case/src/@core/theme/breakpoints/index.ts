const breakpoints = () => ({
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    xxl: 1900
  }
})

export type Breakpoint = keyof ReturnType<typeof breakpoints>['values']

export default breakpoints
