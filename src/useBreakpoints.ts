import { reactive, onMounted, onBeforeUnmount, computed } from "vue";

interface BreakpointsConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export function useBreakpoints(config: "tailwind" | "bootstrap" | BreakpointsConfig = "tailwind", debounceDelay = 250) {
  /**
   * Tailwind breakpoints value taken from TailwindCSS official site
   */
  const tailwindBreakpoints: BreakpointsConfig = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  };

  /**
   * Bootstrap breakpoints value taken from Bootstrap4 official site
   */
  const bootstrapBreakpoints: BreakpointsConfig = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  };

  /**
   * Check which preset is used
   */
  const breakpoints: BreakpointsConfig =
    config === "bootstrap" ? bootstrapBreakpoints : config === "tailwind" ? tailwindBreakpoints : config;

  /**
   * Vue 3 reactive
   */
  const state = reactive({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /**
   * set window height and width
   */
  const computeBreakpoints = () => {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
  };

  let resizeTimeout: ReturnType<typeof setTimeout>;

  /**
   * computeBreakpoints function with a debounce to provide good performance
   */
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      computeBreakpoints();
    }, debounceDelay);
  };

  onMounted(() => {
    /**
     * resize event 
     */
    window.addEventListener("resize", handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    clearTimeout(resizeTimeout);
  });

  // Use computed properties to make the breakpoints reactive
  return {
    xs: computed(() => state.width < breakpoints.sm),
    sm: computed(() => state.width >= breakpoints.sm && state.width < breakpoints.md),
    md: computed(() => state.width >= breakpoints.md && state.width < breakpoints.lg),
    lg: computed(() => state.width >= breakpoints.lg && state.width < breakpoints.xl),
    xl: computed(() => state.width >= breakpoints.xl && state.width < breakpoints.xxl),
    xxl: computed(() => state.width >= breakpoints.xxl),

    xsUp: computed(() => true),
    smUp: computed(() => state.width >= breakpoints.sm),
    mdUp: computed(() => state.width >= breakpoints.md),
    lgUp: computed(() => state.width >= breakpoints.lg),
    xlUp: computed(() => state.width >= breakpoints.xl),
    xxlUp: computed(() => state.width >= breakpoints.xxl),

    xsDown: computed(() => state.width < breakpoints.sm),
    smDown: computed(() => state.width < breakpoints.md),
    mdDown: computed(() => state.width < breakpoints.lg),
    lgDown: computed(() => state.width < breakpoints.xl),
    xlDown: computed(() => state.width < breakpoints.xxl),
    xxlDown: computed(() => true),
  };
}
