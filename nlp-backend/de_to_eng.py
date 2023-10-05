from transformers import MarianMTModel, MarianTokenizer

# Load the German to English translation model and tokenizer
model_name = "Helsinki-NLP/opus-mt-de-en"
model = MarianMTModel.from_pretrained(model_name)
tokenizer = MarianTokenizer.from_pretrained(model_name)

# Function to translate text from German to English
def translate_to_english(text):
    input_ids = tokenizer.encode(text, return_tensors="pt", max_length=512, truncation=True)
    translated_ids = model.generate(input_ids, max_length=512, num_return_sequences=1, decoder_start_token_id=model.config.pad_token_id)
    translated_text = tokenizer.decode(translated_ids[0], skip_special_tokens=True)
    return translated_text.split("=")[1].split("'")[1]

