module.exports = {
  apps: [
    {
      name: "bot-cooking-recipes", // Name of your application
      script: "src/bot.ts", // Entry point of your application
      interpreter: "bun", // Specify Bun as the interpreter
      env: {
        PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`, // Add Bun's bin directory to PATH
      },
    },
  ],
};
