module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    setupFilesAfterEnv: [
        '<rootDir>/tests/setup.js'
    ],
    modulePathIgnorePatterns: [
        '<rootDir>/dist/'
    ]
};