# Kingdom Come Deliverance Potions Database with Task Master AI

This README explains how to use Task Master AI with the Kingdom Come Deliverance Potions Database project.

## What is Task Master AI?

Task Master AI is an AI-powered assistant that helps with various aspects of software development, including:

- Breaking down complex tasks into manageable subtasks
- Generating code for specific features
- Analyzing project structure and suggesting improvements
- Enriching data with additional information
- Optimizing code for performance and readability

## Setup

The Task Master AI configuration has been set up in `.cursor/mcp.json` with the following settings:
- Model: Claude 3.7 Sonnet
- Temperature: 0.2
- Max Tokens: 64000
- Default Subtasks: 5
- Default Priority: Medium

## Getting Started

1. **Start the Task Master AI server**:
   - On macOS/Linux: Run `./scripts/start-taskmaster.sh`
   - On Windows: Run `scripts\start-taskmaster.bat`

2. **Explore the resources**:
   - [Task Master AI Integration Guide](scripts/taskmaster-readme.md) - Detailed guide on using Task Master AI
   - [Project Tasks](scripts/tasks.md) - List of tasks for completing the project
   - [Project Requirements](scripts/prd.txt) - Product Requirements Document

3. **Try the example**:
   - Check out the [Potion Data Enrichment Example](scripts/enrich-potions-example.js) to see how Task Master AI can be used to enrich potion data

## Project Structure

The Kingdom Come Deliverance Potions Database consists of:

- **Backend**: Sanity.io content management system
- **Frontend**: Next.js with Tailwind CSS
- **Data**: JSON files containing potion information

Task Master AI can help with all aspects of the project, from backend schema design to frontend component implementation.

## Using Task Master AI for Development

### 1. Planning and Task Management

Use Task Master AI to break down features into manageable tasks:

```bash
# Start the Task Master AI server
./scripts/start-taskmaster.sh

# Use the Cursor editor to interact with Task Master AI
# Select "Task Master: Generate Tasks" from the command palette
```

### 2. Code Generation

Task Master AI can generate code for specific features:

```javascript
// Example: Generate a search component
const componentCode = await taskMasterAI.generateCode({
  description: 'Create a search component for potions',
  language: 'typescript',
  framework: 'react'
});
```

### 3. Data Enrichment

Task Master AI can help enrich the potion data:

```javascript
// See scripts/enrich-potions-example.js for a complete example
const enrichedData = await taskMasterAI.enrichData({
  data: potionsData,
  fields: ['enhancedEffects', 'acquisition'],
  context: 'medieval alchemy in Kingdom Come Deliverance'
});
```

## Next Steps

1. Review the [Project Tasks](scripts/tasks.md) to understand what needs to be done
2. Start the Task Master AI server using the provided scripts
3. Use Task Master AI to help implement the highest priority tasks
4. Refer to the [Task Master AI Integration Guide](scripts/taskmaster-readme.md) for detailed usage instructions

## Troubleshooting

If you encounter issues with Task Master AI:

1. Ensure the server is running (check terminal output)
2. Verify the configuration in `.cursor/mcp.json` is correct
3. Check that your environment variables are properly set
4. Restart the server if it becomes unresponsive

## Resources

- [Task Master AI Documentation](https://example.com/taskmaster-docs)
- [Sanity.io Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
