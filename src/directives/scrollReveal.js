import ScrollReveal from 'scrollreveal';

const sr = ScrollReveal({
    reset: true,
    distance: "50px",
    duration: 2400,
    delay: 400
});

export const vScrollReveal = {
  mounted(el, binding) {
    const config = binding.value || {};
    sr.reveal(el, config);
  },
};