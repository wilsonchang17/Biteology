import openai

# 設定 OpenAI API 金鑰
openai.api_key = "你的 OpenAI API 金鑰"

def generate_recipe(ingredients):
    prompt = f"Create a recipe using the following ingredients: {', '.join(ingredients)}"
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        temperature=0.7
    )
    
    return response['choices'][0]['text'].strip()