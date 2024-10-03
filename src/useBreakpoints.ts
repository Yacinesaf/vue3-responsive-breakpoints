import { reactive, onMounted, onBeforeUnmount } from "vue";

interface BreakpointsConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export function useBreakpoints(config: "tailwind" | "bootstrap" | BreakpointsConfig = "tailwind", debounceDelay = 250) {
  const tailwindBreakpoints: BreakpointsConfig = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  };

  const bootstrapBreakpoints: BreakpointsConfig = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  };

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
    window.addEventListener("resize", handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    clearTimeout(resizeTimeout);
  });

  return {
    xs: state.width < breakpoints.sm,
    sm: state.width >= breakpoints.sm && state.width < breakpoints.md,
    md: state.width >= breakpoints.md && state.width < breakpoints.lg,
    lg: state.width >= breakpoints.lg && state.width < breakpoints.xl,
    xl: state.width >= breakpoints.xl && state.width < breakpoints.xxl,
    xxl: state.width >= breakpoints.xxl,

    xsUp: true,
    smUp: state.width >= breakpoints.sm,
    mdUp: state.width >= breakpoints.md,
    lgUp: state.width >= breakpoints.lg,
    xlUp: state.width >= breakpoints.xl,
    xxlUp: state.width >= breakpoints.xxl,

    xsDown: state.width < breakpoints.sm,
    smDown: state.width < breakpoints.md,
    mdDown: state.width < breakpoints.lg,
    lgDown: state.width < breakpoints.xl,
    xlDown: state.width < breakpoints.xxl,
    xxlDown: true,
  };
}
