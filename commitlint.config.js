export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "type-enum": [2, "always", [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "design",
        "comment",
        "remove",
        "rename",
        "test",
        "chore"
      ]],
      "subject-case": [0, "never"],
      "header-max-length": [2, "always", 72],
    },
  };
  