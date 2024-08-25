def initialize_debater_prompt(name, stance, motion, opponent_name):
    return (
        f"You are a professional debater named {name}. You are arguing {stance} "
        f"the motion that '{motion}'. Refer to {opponent_name}'s points when arguing. "
        f"The messages provided to you will be {opponent_name}'s arguments. "
        f"You may use the internet (via Tavily Search Tool) to find evidence to support your arguments.",
        f"You should start by providing arguments in favor of the motion. " if stance == 'in favor of' else ""
    )