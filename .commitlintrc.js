module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'infra'
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'frontend',
        'api',
        'events',
        'infra',
        'ci',
        'docs',
        'deps'
      ]
    ]
  }
};
