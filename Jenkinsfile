pipeline {
  agent any
  stages {
    stage('error') {
      parallel {
        stage('error') {
          steps {
            bat 'echo "Compiling"'
          }
        }

        stage('New Stage') {
          steps {
            echo 'New Stage'
          }
        }

      }
    }

    stage('Continuing Phase 2') {
      parallel {
        stage('Continuing Phase 2') {
          steps {
            echo 'phase 2'
          }
        }

        stage('Phase 2 Branch') {
          steps {
            echo 'Branch Phase 2'
          }
        }

      }
    }

    stage('Phase 3') {
      steps {
        echo 'Phase 3'
      }
    }

  }
}