from crewai import Crew, Agent, Task
from pydantic import BaseModel, Field

# Define Pydantic schemas for agent tools
class ResearchInput(BaseModel):
    topic: str = Field(..., description="Topic to research")

class HotelSearchInput(BaseModel):
    city: str = Field(..., description="City for hotel booking")
    num_days: int = Field(..., description="Number of nights")
    budget_level: str = Field(..., description="Budget level: budget, mid-range, luxury")

class SummaryInput(BaseModel):
    details: str = Field(..., description="Trip details to summarize")

# Define agents
researcher = Agent(
    role="ItineraryResearcher",
    goal="Find interesting things to do for a trip.",
    tools=[ResearchInput]
)
hotel_agent = Agent(
    role="HotelBookingAgent",
    goal="Find hotel options based on trip research.",
    tools=[HotelSearchInput]
)
summary_writer = Agent(
    role="SummaryWriter",
    goal="Summarize the trip plan for the user.",
    tools=[SummaryInput]
)

# Define tasks and crew workflow
research_task = Task(
    agent=researcher,
    input=ResearchInput(topic="San Francisco"),
    output="research_results"
)
hotel_task = Task(
    agent=hotel_agent,
    input=HotelSearchInput(city="San Francisco", num_days=3, budget_level="mid-range"),
    output="hotel_options",
    depends_on=[research_task]
)
summary_task = Task(
    agent=summary_writer,
    input=SummaryInput(details="Trip to San Francisco for 3 days, mid-range hotel."),
    output="trip_summary",
    depends_on=[hotel_task]
)

crew = Crew(tasks=[research_task, hotel_task, summary_task])

if __name__ == "__main__":
    results = crew.run()
    print(results)
