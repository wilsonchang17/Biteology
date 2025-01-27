import os
import openai
from dotenv import load_dotenv

# 載入環境變數
load_dotenv()

# 取得 API 金鑰
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

def generate_recipe(ingredients, meal, type):
    """
    將提供的食材傳送到 GPT 模型並接收生成的回傳內容
    """
    try:
        # 建立提示詞，明確指示需要的格式
        prompt = (
            f"Using the following ingredients: {', '.join(ingredients)}, "
            f"create one {type}, {meal} recipe.\n\n"
            "Strictly follow this format:\n"
            "Recipe Name: <Recipe Name>\n"
            "####\n"
            "Ingredients:\n"
            "<ingredient 1>\n"
            "<ingredient 2>\n"
            "... (list all ingredients as plain text, each on a new line)\n"
            "####\n"
            "Instructions:\n"
            "<instruction step 1>\n"
            "<instruction step 2>\n"
            "... (list all steps as plain text, each on a new line)\n\n"
            "Do not include extra descriptions or endings like 'Enjoy your meal.' "
            "Make sure to strictly stick to the format above."
        )

        # 呼叫 OpenAI 的 ChatGPT API
        response = openai.ChatCompletion.create(
            model="gpt-4",  # 確保你使用的模型名稱正確
            messages=[
                {"role": "system", "content": "You are a professional chef."},
                {"role": "user", "content": prompt}
            ]
        )

        # 提取回應內容
        recipe = response["choices"][0]["message"]["content"]
        print("Generated Recipe:", recipe)  # Debug 用
        final_recipe = parse_recipe(recipe)
        print("--------------------")
        print(final_recipe)
        return final_recipe

    except Exception as e:
        print("Error:", str(e))
        return f"An error occurred: {str(e)}"
    
def parse_recipe(response):
    """
    將 GPT 回傳的內容解析，分別提取 Recipe Name、Ingredients 和 Instructions，並存入列表。
    """
    try:
        # 按 ### 分隔回傳內容
        sections = response.split("####")
        
        # 去除多餘的空白並確保有效分隔
        sections = [section.strip() for section in sections if section.strip()]
        
        # 初始化存放結果的列表
        recipe_parts = {"Recipe Name": "", "Ingredients": [], "Instructions": []}
        
        # 依據分隔後的部分提取內容
        for section in sections:
            if section.startswith("Recipe Name:"):
                recipe_parts["Recipe Name"] = section.replace("Recipe Name:", "").strip()
            elif section.startswith("Ingredients:"):
                # 按行拆分並去除多餘空格
                ingredients = section.replace("Ingredients:", "").strip().split("\n")
                recipe_parts["Ingredients"] = [ingredient.strip() for ingredient in ingredients if ingredient.strip()]
            elif section.startswith("Instructions:"):
                # 按行拆分並去除多餘空格
                instructions = section.replace("Instructions:", "").strip().split("\n")
                recipe_parts["Instructions"] = [instruction.strip() for instruction in instructions if instruction.strip()]
        #print(recipe_parts)
        return recipe_parts

    except Exception as e:
        print("Error parsing recipe:", str(e))
        return None

# 測試函式
'''
if __name__ == "__main__":
    result = generate_recipe(["chicken", "potato", "carrot"], "Tai", "Dinner")
    recipe = parse_recipe(result)
    
    print("Result:", recipe)
'''