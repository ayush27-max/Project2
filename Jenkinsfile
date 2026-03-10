pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }
    }
}
```

---

**4.** Scroll down → Click **"Commit changes"**

---

### Your repo structure should look like this after:
```
Project2/
├── weatherio-main/
├── README.md
└── Jenkinsfile   ✅  ← add here
