# Task Master AI Integration Guide

This guide explains how to use Task Master AI with the Kingdom Come Deliverance Potions Database project.

## Setup

1. The Task Master AI configuration has been set up in `.cursor/mcp.json` with the following settings:
   - Model: Claude 3.7 Sonnet
   - Temperature: 0.2
   - Max Tokens: 64000
   - Default Subtasks: 5
   - Default Priority: Medium

2. To start the Task Master AI server:
   - On macOS/Linux: Run `./scripts/start-taskmaster.sh`
   - On Windows: Run `scripts\start-taskmaster.bat`

3. Once the server is running, it will be available as an MCP server in your Cursor editor.

## Using Task Master AI

Task Master AI can help with various aspects of the project:

### Project Analysis

Use Task Master AI to analyze the project structure and suggest improvements:

```javascript
// Example: Analyze the project structure
const analysis = await taskMasterAI.analyzeProject({
  projectPath: '/path/to/project',
  focus: 'architecture'
});
```

### Task Generation

Generate tasks based on the PRD and current project state:

```javascript
// Example: Generate tasks from PRD
const tasks = await taskMasterAI.generateTasks({
  prdPath: '/path/to/prd.txt',
  count: 10,
  priority: 'high'
});
```

### Code Generation

Generate code for specific features:

```javascript
// Example: Generate a component
const componentCode = await taskMasterAI.generateCode({
  description: 'Create a search component for potions',
  language: 'typescript',
  framework: 'react'
});
```

### Data Enrichment

Enrich existing potion data with additional information:

```javascript
// Example: Enrich potion data
const enrichedData = await taskMasterAI.enrichData({
  data: potionsData,
  fields: ['enhancedEffects', 'acquisition'],
  context: 'medieval alchemy in Kingdom Come Deliverance'
});
```

## Integration with Development Workflow

1. **Planning Phase**: Use Task Master AI to break down features into tasks
2. **Development Phase**: Generate code snippets and get implementation suggestions
3. **Review Phase**: Analyze code for improvements and optimizations
4. **Testing Phase**: Generate test cases and validation scenarios

## Available Commands

When the Task Master AI server is running, you can use these commands in your Cursor editor:

- `Task Master: Analyze Project` - Analyze the current project structure
- `Task Master: Generate Tasks` - Generate tasks from the PRD
- `Task Master: Generate Code` - Generate code for a specific feature
- `Task Master: Enrich Data` - Enrich existing data with additional information
- `Task Master: Optimize Code` - Suggest optimizations for selected code

## Troubleshooting

If you encounter issues with Task Master AI:

1. Ensure the server is running (check terminal output)
2. Verify the configuration in `.cursor/mcp.json` is correct
3. Check that your environment variables are properly set
4. Restart the server if it becomes unresponsive

For more information, refer to the [Task Master AI documentation](https://example.com/taskmaster-docs).
