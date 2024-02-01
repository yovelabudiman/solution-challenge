# from flask import Flask, redirect, request, render_template
# from openai import OpenAI
# from firebase import firebase

# app = Flask(__name__)

# client = OpenAI(
#   api_key= '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'
# )

# def chatgpt(prompt):
#     prompt = prompt + " blank out anything inappropriate from the above message"
#     chat_completion = client.chat.completions.create(
#         messages=[
#             {
#                 "role":"user",
#                 "content":prompt
#             }
#         ],
#         model = "gpt-3.5-turbo"
#     )

#     return chat_completion.choices[0].message.content

# @app.route('/msg')
# def userMsg():
#     post_message = request.form.get('user-post')
#     new_message = chatgpt(post_message)
#     return render_template("/",new_message=new_message)
