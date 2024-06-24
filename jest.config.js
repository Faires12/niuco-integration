const config = {
  verbose: true,
  roots: ['<rootDir>'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
}

module.exports = config
