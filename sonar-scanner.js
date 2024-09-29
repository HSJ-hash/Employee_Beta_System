const { scanner } = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.login': 'squ_3fd2ab12342d2b5991aba54bad19579117c8ca5d', // Use your token for authentication
      'sonar.projectName': 'Nova',
      'sonar.projectDescription': 'Nova project with Frontend and Backend analysis',
      'sonar.sourceEncoding': 'UTF-8',
      // Include both Frontend src and Backend directories (controllers, models, routes)
      'sonar.sources': './Frontend/src,./Backend/controllers,./Backend/models,./Backend/routes',
      'sonar.tests': './Frontend/src,./Backend/controllers,./Backend/models,./Backend/routes',
      'sonar.test.inclusions': '**/*.test.tsx,**/*.test.ts', // Include test files
      'sonar.exclusions': '**/*.test.tsx,**/node_modules/**', // Exclude test files and node_modules
      'sonar.testExecutionReportPaths': 'test-report.xml', // Path to your test execution report
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info' // Path to your code coverage report
    },
  },
  () => process.exit()
);
