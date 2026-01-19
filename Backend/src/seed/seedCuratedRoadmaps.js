import mongoose from "mongoose";
import dotenv from "dotenv";
import { GeneratedRoadmap } from "../models/generatedRoadmap.model.js";

dotenv.config();

const curatedRoadmaps = [
  {
    slug: "fullstack-development",
    roadmapType: "curated",
    isDefault: true,
    visibility: "public",
    userId: null,
    roadmapRequestId: null,
    card: {
      level: "Intermediate",
      title: "Full-Stack Development",
      desc: "Master both frontend and backend to build complete web applications",
      tags: ["React", "Node.js", "PostgreSQL"],
      role: "Full-Stack Developer",
    },
    structured: {
      title: "Full-Stack Development Learning Roadmap",
      phases: [
            {
                "id": "phase-1",
                "label": "Phase 1: Fundamentals",
                "topics": [
                    {
                        "title": "HTML & CSS Mastery",
                        "subtopics": [
                            {
                                "id": "subtopic-1-1-1",
                                "title": "Semantic HTML"
                            },
                            {
                                "id": "subtopic-1-1-2",
                                "title": "CSS Flexbox and Grid"
                            },
                            {
                                "id": "subtopic-1-1-3",
                                "title": "Responsive Design Principles"
                            },
                            {
                                "id": "subtopic-1-1-4",
                                "title": "Accessibility Best Practices"
                            }
                        ],
                        "id": "topic-1-1"
                    },
                    {
                        "title": "JavaScript Essentials",
                        "subtopics": [
                            {
                                "id": "subtopic-1-2-1",
                                "title": "ES6+ Features"
                            },
                            {
                                "id": "subtopic-1-2-2",
                                "title": "Asynchronous JavaScript (Promises, Async/Await)"
                            },
                            {
                                "id": "subtopic-1-2-3",
                                "title": "DOM Manipulation"
                            },
                            {
                                "id": "subtopic-1-2-4",
                                "title": "Error Handling and Debugging"
                            }
                        ],
                        "id": "topic-1-2"
                    },
                    {
                        "title": "Introduction to React",
                        "subtopics": [
                            {
                                "id": "subtopic-1-3-1",
                                "title": "React Components and Props"
                            },
                            {
                                "id": "subtopic-1-3-2",
                                "title": "State Management in React"
                            },
                            {
                                "id": "subtopic-1-3-3",
                                "title": "Lifecycle Methods"
                            },
                            {
                                "id": "subtopic-1-3-4",
                                "title": "React Hooks Basics"
                            }
                        ],
                        "id": "topic-1-3"
                    },
                    {
                        "title": "Basic SQL and Databases",
                        "subtopics": [
                            {
                                "id": "subtopic-1-4-1",
                                "title": "Introduction to Relational Databases"
                            },
                            {
                                "id": "subtopic-1-4-2",
                                "title": "Basic SQL Queries (SELECT, INSERT, UPDATE, DELETE)"
                            },
                            {
                                "id": "subtopic-1-4-3",
                                "title": "Database Design Principles"
                            },
                            {
                                "id": "subtopic-1-4-4",
                                "title": "Normalization and Relationships"
                            }
                        ],
                        "id": "topic-1-4"
                    }
                ]
            },
            {
                "id": "phase-2",
                "label": "Phase 2: Intermediate Concepts",
                "topics": [
                    {
                        "title": "Advanced React",
                        "subtopics": [
                            {
                                "id": "subtopic-2-1-1",
                                "title": "Context API"
                            },
                            {
                                "id": "subtopic-2-1-2",
                                "title": "Custom Hooks"
                            },
                            {
                                "id": "subtopic-2-1-3",
                                "title": "React Router for Navigation"
                            },
                            {
                                "id": "subtopic-2-1-4",
                                "title": "Performance Optimization Techniques"
                            }
                        ],
                        "id": "topic-2-1"
                    },
                    {
                        "title": "Node.js and Express",
                        "subtopics": [
                            {
                                "id": "subtopic-2-2-1",
                                "title": "Setting Up a Node.js Server"
                            },
                            {
                                "id": "subtopic-2-2-2",
                                "title": "Building RESTful APIs with Express"
                            },
                            {
                                "id": "subtopic-2-2-3",
                                "title": "Middleware in Express"
                            },
                            {
                                "id": "subtopic-2-2-4",
                                "title": "Error Handling in Node.js"
                            }
                        ],
                        "id": "topic-2-2"
                    },
                    {
                        "title": "PostgreSQL for Developers",
                        "subtopics": [
                            {
                                "id": "subtopic-2-3-1",
                                "title": "Advanced SQL Queries (JOINs, Subqueries)"
                            },
                            {
                                "id": "subtopic-2-3-2",
                                "title": "Database Indexing"
                            },
                            {
                                "id": "subtopic-2-3-3",
                                "title": "Transactions and Concurrency"
                            },
                            {
                                "id": "subtopic-2-3-4",
                                "title": "Using PostgreSQL with Node.js"
                            }
                        ],
                        "id": "topic-2-3"
                    },
                    {
                        "title": "Frontend Build Tools",
                        "subtopics": [
                            {
                                "id": "subtopic-2-4-1",
                                "title": "Webpack Basics"
                            },
                            {
                                "id": "subtopic-2-4-2",
                                "title": "Babel for Transpiling"
                            },
                            {
                                "id": "subtopic-2-4-3",
                                "title": "NPM Scripts"
                            },
                            {
                                "id": "subtopic-2-4-4",
                                "title": "Environment Variables and Configuration"
                            }
                        ],
                        "id": "topic-2-4"
                    }
                ]
            },
            {
                "id": "phase-3",
                "label": "Phase 3: Full-Stack Development",
                "topics": [
                    {
                        "title": "Building Full-Stack Applications",
                        "subtopics": [
                            {
                                "id": "subtopic-3-1-1",
                                "title": "Connecting Frontend and Backend"
                            },
                            {
                                "id": "subtopic-3-1-2",
                                "title": "User Authentication and Authorization"
                            },
                            {
                                "id": "subtopic-3-1-3",
                                "title": "CRUD Operations with React and Node.js"
                            },
                            {
                                "id": "subtopic-3-1-4",
                                "title": "Handling File Uploads"
                            }
                        ],
                        "id": "topic-3-1"
                    },
                    {
                        "title": "Deployment Fundamentals",
                        "subtopics": [
                            {
                                "id": "subtopic-3-2-1",
                                "title": "Introduction to Cloud Services (AWS, Heroku)"
                            },
                            {
                                "id": "subtopic-3-2-2",
                                "title": "Containerization with Docker"
                            },
                            {
                                "id": "subtopic-3-2-3",
                                "title": "CI/CD Pipelines"
                            },
                            {
                                "id": "subtopic-3-2-4",
                                "title": "Monitoring and Logging"
                            }
                        ],
                        "id": "topic-3-2"
                    },
                    {
                        "title": "Scalability and Performance",
                        "subtopics": [
                            {
                                "id": "subtopic-3-3-1",
                                "title": "Load Balancing Techniques"
                            },
                            {
                                "id": "subtopic-3-3-2",
                                "title": "Caching Strategies"
                            },
                            {
                                "id": "subtopic-3-3-3",
                                "title": "Database Optimization"
                            },
                            {
                                "id": "subtopic-3-3-4",
                                "title": "Microservices Architecture"
                            }
                        ],
                        "id": "topic-3-3"
                    },
                    {
                        "title": "Testing and Debugging",
                        "subtopics": [
                            {
                                "id": "subtopic-3-4-1",
                                "title": "Unit Testing with Jest"
                            },
                            {
                                "id": "subtopic-3-4-2",
                                "title": "Integration Testing"
                            },
                            {
                                "id": "subtopic-3-4-3",
                                "title": "End-to-End Testing with Cypress"
                            },
                            {
                                "id": "subtopic-3-4-4",
                                "title": "Debugging Techniques in Node.js and React"
                            }
                        ],
                        "id": "topic-3-4"
                    }
                ]
            }
        ],
    },
  },

  {
    slug: "machine-learning-engineer",
    roadmapType: "curated",
    isDefault: true,
    visibility: "public",
    userId: null,
    roadmapRequestId: null,
    card: {
      level: "Advanced",
      title: "Machine Learning Engineer",
      desc: "Build and deploy ML models with Python, TensorFlow, and MLOps",
      tags: ["Python", "TensorFlow", "PyTorch"],
      role: "Machine Learning Engineer",
    },
    structured: {
      title: "Machine Learning Engineer Learning Roadmap",
      phases: [
            {
                "id": "phase-1",
                "label": "Phase 1: Fundamentals",
                "topics": [
                    {
                        "title": "Introduction to Machine Learning",
                        "subtopics": [
                            {
                                "id": "subtopic-1-1-1",
                                "title": "What is Machine Learning?"
                            },
                            {
                                "id": "subtopic-1-1-2",
                                "title": "Types of Machine Learning"
                            },
                            {
                                "id": "subtopic-1-1-3",
                                "title": "Key Terminology"
                            },
                            {
                                "id": "subtopic-1-1-4",
                                "title": "Applications of Machine Learning"
                            }
                        ],
                        "id": "topic-1-1"
                    },
                    {
                        "title": "Python for Data Science",
                        "subtopics": [
                            {
                                "id": "subtopic-1-2-1",
                                "title": "Data Types and Structures"
                            },
                            {
                                "id": "subtopic-1-2-2",
                                "title": "Control Flow and Functions"
                            },
                            {
                                "id": "subtopic-1-2-3",
                                "title": "Libraries: Pandas and NumPy"
                            },
                            {
                                "id": "subtopic-1-2-4",
                                "title": "Data Visualization with Matplotlib"
                            }
                        ],
                        "id": "topic-1-2"
                    },
                    {
                        "title": "Statistics for Machine Learning",
                        "subtopics": [
                            {
                                "id": "subtopic-1-3-1",
                                "title": "Descriptive Statistics"
                            },
                            {
                                "id": "subtopic-1-3-2",
                                "title": "Probability Distributions"
                            },
                            {
                                "id": "subtopic-1-3-3",
                                "title": "Hypothesis Testing"
                            },
                            {
                                "id": "subtopic-1-3-4",
                                "title": "Statistical Inference"
                            }
                        ],
                        "id": "topic-1-3"
                    },
                    {
                        "title": "Linear Algebra Basics",
                        "subtopics": [
                            {
                                "id": "subtopic-1-4-1",
                                "title": "Vectors and Matrices"
                            },
                            {
                                "id": "subtopic-1-4-2",
                                "title": "Matrix Operations"
                            },
                            {
                                "id": "subtopic-1-4-3",
                                "title": "Eigenvalues and Eigenvectors"
                            },
                            {
                                "id": "subtopic-1-4-4",
                                "title": "Applications in Machine Learning"
                            }
                        ],
                        "id": "topic-1-4"
                    }
                ]
            },
            {
                "id": "phase-2",
                "label": "Phase 2: Core Machine Learning Concepts",
                "topics": [
                    {
                        "title": "Supervised Learning",
                        "subtopics": [
                            {
                                "id": "subtopic-2-1-1",
                                "title": "Regression Algorithms"
                            },
                            {
                                "id": "subtopic-2-1-2",
                                "title": "Classification Algorithms"
                            },
                            {
                                "id": "subtopic-2-1-3",
                                "title": "Model Evaluation Metrics"
                            },
                            {
                                "id": "subtopic-2-1-4",
                                "title": "Overfitting and Underfitting"
                            }
                        ],
                        "id": "topic-2-1"
                    },
                    {
                        "title": "Unsupervised Learning",
                        "subtopics": [
                            {
                                "id": "subtopic-2-2-1",
                                "title": "Clustering Techniques"
                            },
                            {
                                "id": "subtopic-2-2-2",
                                "title": "Dimensionality Reduction"
                            },
                            {
                                "id": "subtopic-2-2-3",
                                "title": "Anomaly Detection"
                            },
                            {
                                "id": "subtopic-2-2-4",
                                "title": "Evaluation of Unsupervised Models"
                            }
                        ],
                        "id": "topic-2-2"
                    },
                    {
                        "title": "Introduction to Neural Networks",
                        "subtopics": [
                            {
                                "id": "subtopic-2-3-1",
                                "title": "Basic Concepts of Neural Networks"
                            },
                            {
                                "id": "subtopic-2-3-2",
                                "title": "Activation Functions"
                            },
                            {
                                "id": "subtopic-2-3-3",
                                "title": "Feedforward and Backpropagation"
                            },
                            {
                                "id": "subtopic-2-3-4",
                                "title": "Training Neural Networks"
                            }
                        ],
                        "id": "topic-2-3"
                    },
                    {
                        "title": "Model Evaluation and Tuning",
                        "subtopics": [
                            {
                                "id": "subtopic-2-4-1",
                                "title": "Cross-Validation Techniques"
                            },
                            {
                                "id": "subtopic-2-4-2",
                                "title": "Hyperparameter Tuning"
                            },
                            {
                                "id": "subtopic-2-4-3",
                                "title": "Model Selection"
                            },
                            {
                                "id": "subtopic-2-4-4",
                                "title": "Performance Metrics"
                            }
                        ],
                        "id": "topic-2-4"
                    }
                ]
            },
            {
                "id": "phase-3",
                "label": "Phase 3: Advanced Topics and Frameworks",
                "topics": [
                    {
                        "title": "Deep Learning with TensorFlow",
                        "subtopics": [
                            {
                                "id": "subtopic-3-1-1",
                                "title": "Introduction to TensorFlow"
                            },
                            {
                                "id": "subtopic-3-1-2",
                                "title": "Building Neural Networks with TensorFlow"
                            },
                            {
                                "id": "subtopic-3-1-3",
                                "title": "TensorFlow Datasets"
                            },
                            {
                                "id": "subtopic-3-1-4",
                                "title": "Model Deployment with TensorFlow Serving"
                            }
                        ],
                        "id": "topic-3-1"
                    },
                    {
                        "title": "Deep Learning with PyTorch",
                        "subtopics": [
                            {
                                "id": "subtopic-3-2-1",
                                "title": "Introduction to PyTorch"
                            },
                            {
                                "id": "subtopic-3-2-2",
                                "title": "Building Neural Networks with PyTorch"
                            },
                            {
                                "id": "subtopic-3-2-3",
                                "title": "Autograd and Optimization"
                            },
                            {
                                "id": "subtopic-3-2-4",
                                "title": "Model Deployment with TorchServe"
                            }
                        ],
                        "id": "topic-3-2"
                    },
                    {
                        "title": "Introduction to MLOps",
                        "subtopics": [
                            {
                                "id": "subtopic-3-3-1",
                                "title": "What is MLOps?"
                            },
                            {
                                "id": "subtopic-3-3-2",
                                "title": "MLOps Lifecycle"
                            },
                            {
                                "id": "subtopic-3-3-3",
                                "title": "Continuous Integration and Deployment"
                            },
                            {
                                "id": "subtopic-3-3-4",
                                "title": "Monitoring and Maintenance of ML Models"
                            }
                        ],
                        "id": "topic-3-3"
                    },
                    {
                        "title": "Model Deployment Basics",
                        "subtopics": [
                            {
                                "id": "subtopic-3-4-1",
                                "title": "Deployment Strategies"
                            },
                            {
                                "id": "subtopic-3-4-2",
                                "title": "APIs for Model Serving"
                            },
                            {
                                "id": "subtopic-3-4-3",
                                "title": "Containerization with Docker"
                            },
                            {
                                "id": "subtopic-3-4-4",
                                "title": "Cloud Services for ML Deployment"
                            }
                        ],
                        "id": "topic-3-4"
                    }
                ],
              }
            ],
          },
  },

  {
    slug: "backend-developer",
    roadmapType: "curated",
    isDefault: true,
    visibility: "public",
    userId: null,
    roadmapRequestId: null,
    card: {
      level: "Intermediate",
      title: "Backend Developer",
      desc: "Design scalable APIs and microservices architectures",
      tags: ["Go", "Docker", "Kubernetes"],
      role: "Backend Developer",
    },
    structured: {
      title: "Backend Developer Learning Roadmap",
      phases: [
            {
                "id": "phase-1",
                "label": "Phase 1: Fundamentals",
                "topics": [
                    {
                        "title": "Programming Basics",
                        "subtopics": [
                            {
                                "id": "subtopic-1-1-1",
                                "title": "Data types and variables"
                            },
                            {
                                "id": "subtopic-1-1-2",
                                "title": "Control structures"
                            },
                            {
                                "id": "subtopic-1-1-3",
                                "title": "Functions and methods"
                            },
                            {
                                "id": "subtopic-1-1-4",
                                "title": "Error handling"
                            }
                        ],
                        "id": "topic-1-1"
                    },
                    {
                        "title": "Introduction to APIs",
                        "subtopics": [
                            {
                                "id": "subtopic-1-2-1",
                                "title": "What is an API?"
                            },
                            {
                                "id": "subtopic-1-2-2",
                                "title": "RESTful APIs vs. SOAP"
                            },
                            {
                                "id": "subtopic-1-2-3",
                                "title": "API authentication methods"
                            },
                            {
                                "id": "subtopic-1-2-4",
                                "title": "API documentation"
                            }
                        ],
                        "id": "topic-1-2"
                    },
                    {
                        "title": "Databases and SQL",
                        "subtopics": [
                            {
                                "id": "subtopic-1-3-1",
                                "title": "Introduction to databases"
                            },
                            {
                                "id": "subtopic-1-3-2",
                                "title": "SQL basics"
                            },
                            {
                                "id": "subtopic-1-3-3",
                                "title": "CRUD operations"
                            },
                            {
                                "id": "subtopic-1-3-4",
                                "title": "Database normalization"
                            }
                        ],
                        "id": "topic-1-3"
                    }
                ]
            },
            {
                "id": "phase-2",
                "label": "Phase 2: Intermediate Concepts",
                "topics": [
                    {
                        "title": "Building Scalable APIs",
                        "subtopics": [
                            {
                                "id": "subtopic-2-1-1",
                                "title": "API versioning"
                            },
                            {
                                "id": "subtopic-2-1-2",
                                "title": "Rate limiting"
                            },
                            {
                                "id": "subtopic-2-1-3",
                                "title": "Caching strategies"
                            },
                            {
                                "id": "subtopic-2-1-4",
                                "title": "Error handling in APIs"
                            }
                        ],
                        "id": "topic-2-1"
                    },
                    {
                        "title": "Microservices Introduction",
                        "subtopics": [
                            {
                                "id": "subtopic-2-2-1",
                                "title": "What are microservices?"
                            },
                            {
                                "id": "subtopic-2-2-2",
                                "title": "Benefits of microservices architecture"
                            },
                            {
                                "id": "subtopic-2-2-3",
                                "title": "Communication between microservices"
                            },
                            {
                                "id": "subtopic-2-2-4",
                                "title": "Service discovery"
                            }
                        ],
                        "id": "topic-2-2"
                    },
                    {
                        "title": "Introduction to Docker",
                        "subtopics": [
                            {
                                "id": "subtopic-2-3-1",
                                "title": "What is Docker?"
                            },
                            {
                                "id": "subtopic-2-3-2",
                                "title": "Docker images and containers"
                            },
                            {
                                "id": "subtopic-2-3-3",
                                "title": "Dockerfile basics"
                            },
                            {
                                "id": "subtopic-2-3-4",
                                "title": "Managing Docker containers"
                            }
                        ],
                        "id": "topic-2-3"
                    }
                ]
            },
            {
                "id": "phase-3",
                "label": "Phase 3: Advanced Topics",
                "topics": [
                    {
                        "title": "Kubernetes Basics",
                        "subtopics": [
                            {
                                "id": "subtopic-3-1-1",
                                "title": "What is Kubernetes?"
                            },
                            {
                                "id": "subtopic-3-1-2",
                                "title": "Kubernetes architecture"
                            },
                            {
                                "id": "subtopic-3-1-3",
                                "title": "Deploying applications on Kubernetes"
                            },
                            {
                                "id": "subtopic-3-1-4",
                                "title": "Managing pods and services"
                            }
                        ],
                        "id": "topic-3-1"
                    },
                    {
                        "title": "Backend Best Practices",
                        "subtopics": [
                            {
                                "id": "subtopic-3-2-1",
                                "title": "Code organization and structure"
                            },
                            {
                                "id": "subtopic-3-2-2",
                                "title": "Testing strategies for APIs"
                            },
                            {
                                "id": "subtopic-3-2-3",
                                "title": "Monitoring and logging"
                            },
                            {
                                "id": "subtopic-3-2-4",
                                "title": "Security best practices"
                            }
                        ],
                        "id": "topic-3-2"
                    },
                    {
                        "title": "System Design Principles",
                        "subtopics": [
                            {
                                "id": "subtopic-3-3-1",
                                "title": "Understanding system design"
                            },
                            {
                                "id": "subtopic-3-3-2",
                                "title": "Scalability and performance"
                            },
                            {
                                "id": "subtopic-3-3-3",
                                "title": "Database design considerations"
                            },
                            {
                                "id": "subtopic-3-3-4",
                                "title": "Load balancing techniques"
                            }
                        ],
                        "id": "topic-3-3"
                    }
                ]
            }
        ]
    },
  },

  {
    slug: "generative-ai-roadmap",
    roadmapType: "curated",
    isDefault: true,
    visibility: "public",
    userId: null,
    roadmapRequestId: null,
    card: {
      level: "Beginner",
      title: "Generative AI Roadmap",
      desc: "Learn LLMs, prompt engineering, RAG, and build real GenAI apps end-to-end",
      tags: ["LLMs", "RAG", "LangChain"],
      role: "Generative AI Engineer",
    },
    structured: {
      title: "Generative AI Learning Roadmap",
      phases: [
            {
                "id": "phase-1",
                "label": "Phase 1: Fundamentals",
                "topics": [
                    {
                        "title": "Introduction to Generative AI",
                        "subtopics": [
                            {
                                "id": "subtopic-1-1-1",
                                "title": "What is Generative AI?"
                            },
                            {
                                "id": "subtopic-1-1-2",
                                "title": "History and Evolution of AI"
                            },
                            {
                                "id": "subtopic-1-1-3",
                                "title": "Types of Generative Models"
                            },
                            {
                                "id": "subtopic-1-1-4",
                                "title": "Applications of Generative AI"
                            }
                        ],
                        "id": "topic-1-1"
                    },
                    {
                        "title": "Basics of LLMs (Large Language Models)",
                        "subtopics": [
                            {
                                "id": "subtopic-1-2-1",
                                "title": "Understanding LLMs"
                            },
                            {
                                "id": "subtopic-1-2-2",
                                "title": "Architecture of LLMs"
                            },
                            {
                                "id": "subtopic-1-2-3",
                                "title": "Training LLMs"
                            },
                            {
                                "id": "subtopic-1-2-4",
                                "title": "Popular LLMs and Their Use Cases"
                            }
                        ],
                        "id": "topic-1-2"
                    },
                    {
                        "title": "Prompt Engineering Basics",
                        "subtopics": [
                            {
                                "id": "subtopic-1-3-1",
                                "title": "What is Prompt Engineering?"
                            },
                            {
                                "id": "subtopic-1-3-2",
                                "title": "Crafting Effective Prompts"
                            },
                            {
                                "id": "subtopic-1-3-3",
                                "title": "Common Prompting Techniques"
                            },
                            {
                                "id": "subtopic-1-3-4",
                                "title": "Evaluating Prompt Performance"
                            }
                        ],
                        "id": "topic-1-3"
                    },
                    {
                        "title": "Introduction to APIs",
                        "subtopics": [
                            {
                                "id": "subtopic-1-4-1",
                                "title": "What are APIs?"
                            },
                            {
                                "id": "subtopic-1-4-2",
                                "title": "REST vs. GraphQL APIs"
                            },
                            {
                                "id": "subtopic-1-4-3",
                                "title": "Using APIs in Python"
                            },
                            {
                                "id": "subtopic-1-4-4",
                                "title": "API Authentication and Security"
                            }
                        ],
                        "id": "topic-1-4"
                    }
                ]
            },
            {
                "id": "phase-2",
                "label": "Phase 2: Intermediate Concepts",
                "topics": [
                    {
                        "title": "Advanced Prompt Engineering",
                        "subtopics": [
                            {
                                "id": "subtopic-2-1-1",
                                "title": "Contextual Prompting"
                            },
                            {
                                "id": "subtopic-2-1-2",
                                "title": "Chaining Prompts"
                            },
                            {
                                "id": "subtopic-2-1-3",
                                "title": "Dynamic Prompt Generation"
                            },
                            {
                                "id": "subtopic-2-1-4",
                                "title": "Common Pitfalls in Prompt Engineering"
                            }
                        ],
                        "id": "topic-2-1"
                    },
                    {
                        "title": "Building RAG (Retrieval-Augmented Generation) Pipelines",
                        "subtopics": [
                            {
                                "id": "subtopic-2-2-1",
                                "title": "Understanding RAG"
                            },
                            {
                                "id": "subtopic-2-2-2",
                                "title": "Components of RAG Pipelines"
                            },
                            {
                                "id": "subtopic-2-2-3",
                                "title": "Implementing RAG with LLMs"
                            },
                            {
                                "id": "subtopic-2-2-4",
                                "title": "Evaluating RAG Performance"
                            }
                        ],
                        "id": "topic-2-2"
                    },
                    {
                        "title": "Vector Databases for AI Applications",
                        "subtopics": [
                            {
                                "id": "subtopic-2-3-1",
                                "title": "Introduction to Vector Databases"
                            },
                            {
                                "id": "subtopic-2-3-2",
                                "title": "Storing and Retrieving Vectors"
                            },
                            {
                                "id": "subtopic-2-3-3",
                                "title": "Use Cases of Vector Databases"
                            },
                            {
                                "id": "subtopic-2-3-4",
                                "title": "Integrating Vector Databases with LLMs"
                            }
                        ],
                        "id": "topic-2-3"
                    }
                ]
            },
            {
                "id": "phase-3",
                "label": "Phase 3: Advanced Applications",
                "topics": [
                    {
                        "title": "Tool Calling and Integration",
                        "subtopics": [
                            {
                                "id": "subtopic-3-1-1",
                                "title": "Understanding Tool Calling"
                            },
                            {
                                "id": "subtopic-3-1-2",
                                "title": "Integrating External Tools with LLMs"
                            },
                            {
                                "id": "subtopic-3-1-3",
                                "title": "Use Cases of Tool Calling"
                            },
                            {
                                "id": "subtopic-3-1-4",
                                "title": "Best Practices for Tool Integration"
                            }
                        ],
                        "id": "topic-3-1"
                    },
                    {
                        "title": "LangChain and LangGraph Basics",
                        "subtopics": [
                            {
                                "id": "subtopic-3-2-1",
                                "title": "Introduction to LangChain"
                            },
                            {
                                "id": "subtopic-3-2-2",
                                "title": "Building Applications with LangChain"
                            },
                            {
                                "id": "subtopic-3-2-3",
                                "title": "Understanding LangGraph"
                            },
                            {
                                "id": "subtopic-3-2-4",
                                "title": "Use Cases of LangChain and LangGraph"
                            }
                        ],
                        "id": "topic-3-2"
                    },
                    {
                        "title": "Real-World Generative AI Applications",
                        "subtopics": [
                            {
                                "id": "subtopic-3-3-1",
                                "title": "Case Studies of Successful GenAI Apps"
                            },
                            {
                                "id": "subtopic-3-3-2",
                                "title": "Designing Your Own GenAI Application"
                            },
                            {
                                "id": "subtopic-3-3-3",
                                "title": "Testing and Iterating on GenAI Apps"
                            },
                            {
                                "id": "subtopic-3-3-4",
                                "title": "Deployment Strategies for GenAI Applications"
                            }
                        ],
                        "id": "topic-3-3"
                    }
                ]
            },
            {
                "id": "phase-4",
                "label": "Phase 4: Capstone Project",
                "topics": [
                    {
                        "title": "Capstone Project Development",
                        "subtopics": [
                            {
                                "id": "subtopic-4-1-1",
                                "title": "Choosing a Project Topic"
                            },
                            {
                                "id": "subtopic-4-1-2",
                                "title": "Project Planning and Design"
                            },
                            {
                                "id": "subtopic-4-1-3",
                                "title": "Implementation of Generative AI Solutions"
                            },
                            {
                                "id": "subtopic-4-1-4",
                                "title": "Presenting Your Project"
                            }
                        ],
                        "id": "topic-4-1"
                    },
                    {
                        "title": "Portfolio Development",
                        "subtopics": [
                            {
                                "id": "subtopic-4-2-1",
                                "title": "Documenting Your Projects"
                            },
                            {
                                "id": "subtopic-4-2-2",
                                "title": "Creating a Professional Portfolio"
                            },
                            {
                                "id": "subtopic-4-2-3",
                                "title": "Showcasing Skills to Employers"
                            },
                            {
                                "id": "subtopic-4-2-4",
                                "title": "Networking and Job Search Strategies"
                            }
                        ],
                        "id": "topic-4-2"
                    }
                ]
            }
        ]
    },
  },

  {
    slug: "devops-engineer",
    roadmapType: "curated",
    isDefault: true,
    visibility: "public",
    userId: null,
    roadmapRequestId: null,
    card: {
      level: "Advanced",
      title: "DevOps Engineer",
      desc: "Master CI/CD, infrastructure automation, and cloud platforms",
      tags: ["AWS", "Terraform", "Jenkins"],
      role: "DevOps Engineer",
    },
    structured: {
      title: "DevOps Engineer Learning Roadmap",
      phases: [
            {
                "id": "phase-1",
                "label": "Phase 1: Fundamentals",
                "topics": [
                    {
                        "title": "Linux Basics for DevOps",
                        "subtopics": [
                            {
                                "id": "subtopic-1-1-1",
                                "title": "File system structure"
                            },
                            {
                                "id": "subtopic-1-1-2",
                                "title": "Basic commands and utilities"
                            },
                            {
                                "id": "subtopic-1-1-3",
                                "title": "User and group management"
                            },
                            {
                                "id": "subtopic-1-1-4",
                                "title": "Permissions and ownership"
                            },
                            {
                                "id": "subtopic-1-1-5",
                                "title": "Networking commands"
                            }
                        ],
                        "id": "topic-1-1"
                    },
                    {
                        "title": "Version Control with Git",
                        "subtopics": [
                            {
                                "id": "subtopic-1-2-1",
                                "title": "Git installation and setup"
                            },
                            {
                                "id": "subtopic-1-2-2",
                                "title": "Basic Git commands"
                            },
                            {
                                "id": "subtopic-1-2-3",
                                "title": "Branching and merging"
                            },
                            {
                                "id": "subtopic-1-2-4",
                                "title": "Remote repositories"
                            },
                            {
                                "id": "subtopic-1-2-5",
                                "title": "Collaboration workflows"
                            }
                        ],
                        "id": "topic-1-2"
                    },
                    {
                        "title": "Introduction to Docker",
                        "subtopics": [
                            {
                                "id": "subtopic-1-3-1",
                                "title": "Docker installation and setup"
                            },
                            {
                                "id": "subtopic-1-3-2",
                                "title": "Understanding containers vs. VMs"
                            },
                            {
                                "id": "subtopic-1-3-3",
                                "title": "Creating and managing containers"
                            },
                            {
                                "id": "subtopic-1-3-4",
                                "title": "Docker images and registries"
                            },
                            {
                                "id": "subtopic-1-3-5",
                                "title": "Docker networking basics"
                            }
                        ],
                        "id": "topic-1-3"
                    },
                    {
                        "title": "Cloud Basics with AWS",
                        "subtopics": [
                            {
                                "id": "subtopic-1-4-1",
                                "title": "AWS account setup"
                            },
                            {
                                "id": "subtopic-1-4-2",
                                "title": "Overview of AWS services"
                            },
                            {
                                "id": "subtopic-1-4-3",
                                "title": "Understanding regions and availability zones"
                            },
                            {
                                "id": "subtopic-1-4-4",
                                "title": "Basic IAM roles and permissions"
                            },
                            {
                                "id": "subtopic-1-4-5",
                                "title": "Introduction to EC2 and S3"
                            }
                        ],
                        "id": "topic-1-4"
                    }
                ]
            },
            {
                "id": "phase-2",
                "label": "Phase 2: Intermediate Skills",
                "topics": [
                    {
                        "title": "CI/CD Pipelines",
                        "subtopics": [
                            {
                                "id": "subtopic-2-1-1",
                                "title": "Understanding CI/CD concepts"
                            },
                            {
                                "id": "subtopic-2-1-2",
                                "title": "Setting up a CI/CD pipeline"
                            },
                            {
                                "id": "subtopic-2-1-3",
                                "title": "Using Jenkins for automation"
                            },
                            {
                                "id": "subtopic-2-1-4",
                                "title": "Integrating Git with CI/CD"
                            },
                            {
                                "id": "subtopic-2-1-5",
                                "title": "Monitoring and logging in CI/CD"
                            }
                        ],
                        "id": "topic-2-1"
                    },
                    {
                        "title": "Infrastructure as Code with Terraform",
                        "subtopics": [
                            {
                                "id": "subtopic-2-2-1",
                                "title": "Terraform installation and setup"
                            },
                            {
                                "id": "subtopic-2-2-2",
                                "title": "Understanding Terraform configuration files"
                            },
                            {
                                "id": "subtopic-2-2-3",
                                "title": "Managing infrastructure with Terraform"
                            },
                            {
                                "id": "subtopic-2-2-4",
                                "title": "State management in Terraform"
                            },
                            {
                                "id": "subtopic-2-2-5",
                                "title": "Modules and best practices"
                            }
                        ],
                        "id": "topic-2-2"
                    },
                    {
                        "title": "Networking Fundamentals for DevOps",
                        "subtopics": [
                            {
                                "id": "subtopic-2-3-1",
                                "title": "TCP/IP model and OSI layers"
                            },
                            {
                                "id": "subtopic-2-3-2",
                                "title": "Understanding DNS and load balancing"
                            },
                            {
                                "id": "subtopic-2-3-3",
                                "title": "VPC and subnet configurations"
                            },
                            {
                                "id": "subtopic-2-3-4",
                                "title": "Security groups and network ACLs"
                            },
                            {
                                "id": "subtopic-2-3-5",
                                "title": "Basic troubleshooting techniques"
                            }
                        ],
                        "id": "topic-2-3"
                    }
                ]
            },
            {
                "id": "phase-3",
                "label": "Phase 3: Advanced Topics",
                "topics": [
                    {
                        "title": "Kubernetes Overview",
                        "subtopics": [
                            {
                                "id": "subtopic-3-1-1",
                                "title": "Understanding container orchestration"
                            },
                            {
                                "id": "subtopic-3-1-2",
                                "title": "Kubernetes architecture and components"
                            },
                            {
                                "id": "subtopic-3-1-3",
                                "title": "Deploying applications on Kubernetes"
                            },
                            {
                                "id": "subtopic-3-1-4",
                                "title": "Managing pods and services"
                            },
                            {
                                "id": "subtopic-3-1-5",
                                "title": "Scaling and monitoring Kubernetes"
                            }
                        ],
                        "id": "topic-3-1"
                    },
                    {
                        "title": "Advanced CI/CD Practices",
                        "subtopics": [
                            {
                                "id": "subtopic-3-2-1",
                                "title": "Implementing blue-green deployments"
                            },
                            {
                                "id": "subtopic-3-2-2",
                                "title": "Canary releases and feature toggles"
                            },
                            {
                                "id": "subtopic-3-2-3",
                                "title": "Automating testing in CI/CD"
                            },
                            {
                                "id": "subtopic-3-2-4",
                                "title": "Security in CI/CD pipelines"
                            },
                            {
                                "id": "subtopic-3-2-5",
                                "title": "Continuous feedback and improvement"
                            }
                        ],
                        "id": "topic-3-2"
                    },
                    {
                        "title": "Cloud Infrastructure Management",
                        "subtopics": [
                            {
                                "id": "subtopic-3-3-1",
                                "title": "Advanced AWS services (RDS, Lambda)"
                            },
                            {
                                "id": "subtopic-3-3-2",
                                "title": "Cost management and optimization"
                            },
                            {
                                "id": "subtopic-3-3-3",
                                "title": "Disaster recovery strategies"
                            },
                            {
                                "id": "subtopic-3-3-4",
                                "title": "Monitoring and logging with CloudWatch"
                            },
                            {
                                "id": "subtopic-3-3-5",
                                "title": "Infrastructure scaling and automation"
                            }
                        ],
                        "id": "topic-3-3"
                    }
                ]
            }
        ]
    },
  },

  {
    slug: "ai-product-manager",
    roadmapType: "curated",
    isDefault: true,
    visibility: "public",
    userId: null,
    roadmapRequestId: null,
    card: {
      level: "Intermediate",
      title: "AI Product Manager",
      desc: "Lead AI product development from ideation to deployment",
      tags: ["Product Strategy", "AI/ML", "Agile"],
      role: "Product Manager",
    },
    structured: {
      title: "AI Product Manager Learning Roadmap",
      phases: [
            {
                "id": "phase-1",
                "label": "Phase 1: Foundations of AI Product Management",
                "topics": [
                    {
                        "title": "Understanding AI and Product Management",
                        "subtopics": [
                            {
                                "id": "subtopic-1-1-1",
                                "title": "Introduction to AI concepts"
                            },
                            {
                                "id": "subtopic-1-1-2",
                                "title": "Role of a product manager in AI"
                            },
                            {
                                "id": "subtopic-1-1-3",
                                "title": "AI product lifecycle overview"
                            },
                            {
                                "id": "subtopic-1-1-4",
                                "title": "Key differences between traditional and AI product management"
                            }
                        ],
                        "id": "topic-1-1"
                    },
                    {
                        "title": "User Research in AI Products",
                        "subtopics": [
                            {
                                "id": "subtopic-1-2-1",
                                "title": "Identifying user needs for AI solutions"
                            },
                            {
                                "id": "subtopic-1-2-2",
                                "title": "Conducting effective user interviews"
                            },
                            {
                                "id": "subtopic-1-2-3",
                                "title": "Analyzing user feedback"
                            },
                            {
                                "id": "subtopic-1-2-4",
                                "title": "Creating user personas for AI products"
                            }
                        ],
                        "id": "topic-1-2"
                    },
                    {
                        "title": "Agile Methodologies for AI Development",
                        "subtopics": [
                            {
                                "id": "subtopic-1-3-1",
                                "title": "Applying Agile principles to AI projects"
                            },
                            {
                                "id": "subtopic-1-3-2",
                                "title": "Scrum framework for AI product teams"
                            },
                            {
                                "id": "subtopic-1-3-3",
                                "title": "Managing sprints in AI development"
                            },
                            {
                                "id": "subtopic-1-3-4",
                                "title": "Iterative development and feedback loops"
                            }
                        ],
                        "id": "topic-1-3"
                    }
                ]
            },
            {
                "id": "phase-2",
                "label": "Phase 2: Advanced AI Product Strategies",
                "topics": [
                    {
                        "title": "Problem Framing for AI Solutions",
                        "subtopics": [
                            {
                                "id": "subtopic-2-1-1",
                                "title": "Defining the problem space"
                            },
                            {
                                "id": "subtopic-2-1-2",
                                "title": "Techniques for effective problem framing"
                            },
                            {
                                "id": "subtopic-2-1-3",
                                "title": "Aligning AI solutions with business goals"
                            },
                            {
                                "id": "subtopic-2-1-4",
                                "title": "Case studies of successful AI problem framing"
                            }
                        ],
                        "id": "topic-2-1"
                    },
                    {
                        "title": "Minimum Viable Product (MVP) Planning",
                        "subtopics": [
                            {
                                "id": "subtopic-2-2-1",
                                "title": "Concept of MVP in AI products"
                            },
                            {
                                "id": "subtopic-2-2-2",
                                "title": "Identifying core features for MVP"
                            },
                            {
                                "id": "subtopic-2-2-3",
                                "title": "Testing and validating MVP assumptions"
                            },
                            {
                                "id": "subtopic-2-2-4",
                                "title": "Iterating based on MVP feedback"
                            }
                        ],
                        "id": "topic-2-2"
                    },
                    {
                        "title": "Evaluating AI Products",
                        "subtopics": [
                            {
                                "id": "subtopic-2-3-1",
                                "title": "Metrics for AI product success"
                            },
                            {
                                "id": "subtopic-2-3-2",
                                "title": "User acceptance testing for AI solutions"
                            },
                            {
                                "id": "subtopic-2-3-3",
                                "title": "A/B testing in AI products"
                            },
                            {
                                "id": "subtopic-2-3-4",
                                "title": "Continuous improvement based on evaluation"
                            }
                        ],
                        "id": "topic-2-3"
                    },
                    {
                        "title": "Ethics in AI Product Management",
                        "subtopics": [
                            {
                                "id": "subtopic-2-4-1",
                                "title": "Understanding ethical considerations in AI"
                            },
                            {
                                "id": "subtopic-2-4-2",
                                "title": "Addressing bias in AI algorithms"
                            },
                            {
                                "id": "subtopic-2-4-3",
                                "title": "Privacy concerns in AI product design"
                            },
                            {
                                "id": "subtopic-2-4-4",
                                "title": "Creating ethical guidelines for AI products"
                            }
                        ],
                        "id": "topic-2-4"
                    }
                ]
            },
            {
                "id": "phase-3",
                "label": "Phase 3: Stakeholder Alignment and Leadership",
                "topics": [
                    {
                        "title": "Stakeholder Management in AI Projects",
                        "subtopics": [
                            {
                                "id": "subtopic-3-1-1",
                                "title": "Identifying key stakeholders"
                            },
                            {
                                "id": "subtopic-3-1-2",
                                "title": "Effective communication strategies"
                            },
                            {
                                "id": "subtopic-3-1-3",
                                "title": "Building consensus among stakeholders"
                            },
                            {
                                "id": "subtopic-3-1-4",
                                "title": "Managing expectations and feedback"
                            }
                        ],
                        "id": "topic-3-1"
                    },
                    {
                        "title": "Leading AI Product Teams",
                        "subtopics": [
                            {
                                "id": "subtopic-3-2-1",
                                "title": "Building and managing cross-functional teams"
                            },
                            {
                                "id": "subtopic-3-2-2",
                                "title": "Fostering a culture of innovation"
                            },
                            {
                                "id": "subtopic-3-2-3",
                                "title": "Conflict resolution in product teams"
                            },
                            {
                                "id": "subtopic-3-2-4",
                                "title": "Mentoring and coaching team members"
                            }
                        ],
                        "id": "topic-3-2"
                    },
                    {
                        "title": "Strategic Vision for AI Products",
                        "subtopics": [
                            {
                                "id": "subtopic-3-3-1",
                                "title": "Setting long-term goals for AI products"
                            },
                            {
                                "id": "subtopic-3-3-2",
                                "title": "Aligning product strategy with company vision"
                            },
                            {
                                "id": "subtopic-3-3-3",
                                "title": "Market analysis for AI products"
                            },
                            {
                                "id": "subtopic-3-3-4",
                                "title": "Adapting to industry trends and changes"
                            }
                        ],
                        "id": "topic-3-3"
                    }
                ]
            }
        ]
    },
  },
];

async function seedCuratedRoadmaps() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    for (const rm of curatedRoadmaps) {
      // 🔥 Upsert by title (stable key)
      await GeneratedRoadmap.updateOne(
        { roadmapType: "curated", isDefault: true, "card.title": rm.card.title },
        { $set: rm },
        { upsert: true }
      );

      console.log(`Seeded: ${rm.card.title}`);
    }

    console.log("Curated roadmaps seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedCuratedRoadmaps();