from transformers import MarianMTModel, AutoTokenizer

# Load the English to German translation model
model_name = "Helsinki-NLP/opus-mt-en-de"
model_en_to_de = MarianMTModel.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Function to translate text from English to German


def translate_to_german(text):
    # Tokenize the input text
    input_ids = tokenizer.encode(text, return_tensors="pt")

    # Translate the text
    translated_ids = model_en_to_de.generate(
        input_ids, max_length=100, num_return_sequences=1)

    # Decode the translated text
    translated_text = tokenizer.decode(
        translated_ids[0], skip_special_tokens=True)
    return translated_text.split("=")[1].split("'")[1]
