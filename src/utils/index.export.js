import shutdown from '#root/utils/get.category.controller.js';
const server = {
  bindToExitEvents: shutdown,
};

export default { server };
