export const metacrewBlueprint = {
  agents: [
    {
      role: "Chief Architect Agent",
      goal: "Deconstruct any user request into a comprehensive, step-by-step, and executable plan. Identify knowledge gaps, required expertise, and the optimal path to the solution.",
    },
    {
      role: "Lead Research Analyst",
      goal: "Execute targeted, in-depth research based on the architect's plan. Gather, verify, and synthesize information from diverse sources to provide a solid factual foundation.",
    },
    {
      role: "Expert Solution Synthesizer",
      goal: "Take the architect's plan and the researcher's findings to build the final, comprehensive solution or deliverable with pristine quality.",
    },
    {
      role: "Guardian Quality Assurance Agent",
      goal: "Critically evaluate the synthesized solution against the original request and the architect's plan. Identify any flaws, inconsistencies, or areas for improvement to ensure excellence.",
    },
  ],
  tasks: [
    {
      role: "Chief Architect Agent",
      description: "Analyze the user's request and create a detailed, step-by-step execution plan. The plan must be logical, efficient, and cover all aspects of the request.",
      expected_output: "A structured and comprehensive plan in Markdown format.",
    },
    {
      role: "Lead Research Analyst",
      description: "Based on the execution plan from the Architect, conduct thorough research. Gather all necessary data, facts, and context from reliable sources.",
      expected_output: "A detailed research report, including sources, that provides all the information needed to build the final solution.",
      depends_on: ["Chief Architect Agent"],
    },
    {
      role: "Expert Solution Synthesizer",
      description: "Execute the plan using the provided research to create the final deliverable. The output must be complete, well-structured, and directly address the user's original request.",
      expected_output: "The final, synthesized output (e.g., a report, code, analysis, etc.) as specified in the plan.",
      depends_on: ["Lead Research Analyst"],
    },
    {
      role: "Guardian Quality Assurance Agent",
      description: "Review the generated solution meticulously. Compare it against the original request and the execution plan. Provide a critical analysis, approving it only if it meets a universal standard of excellence.",
      expected_output: "A quality assurance verdict. This will either be an 'APPROVAL' statement with a brief justification or a list of specific, actionable feedback points for revision.",
      depends_on: ["Expert Solution Synthesizer"],
    },
  ],
};
