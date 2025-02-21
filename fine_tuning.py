import os
import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from datasets import load_from_disk

# Set paths
dataset_path = "mental_health_counseling_processed"  # Use the processed dataset
model_name = "gpt2"  # You can change this to "gpt2-medium" or "gpt2-large" for better results
output_dir = "backend/fine_tuned_gpt2_mental_health"

# Check for CUDA availability
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
n_gpu = torch.cuda.device_count()

if torch.cuda.is_available():
    print(f"Fine-tuning on {n_gpu} GPU(s) available!")
else:
    print("Fine-tuning on CPU. This will be slow.")

# Load dataset and tokenizer
dataset = load_from_disk(dataset_path)

tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token  # Set pad token

# Tokenize the dataset
def tokenize_function(examples):
    return tokenizer(examples["text"], truncation=True, padding="max_length", max_length=512)

dataset = dataset.map(tokenize_function, batched=True, remove_columns=["text"])  # Ensure correct format

# Define data collator
data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

# Load model
model = AutoModelForCausalLM.from_pretrained(model_name)
model.to(device)

print("Model loaded successfully.")

# Define training arguments
training_args = TrainingArguments(
    output_dir=output_dir,
    overwrite_output_dir=True,
    num_train_epochs=10,
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
    save_steps=2000,
    save_total_limit=2,
    logging_dir="./logs",
    logging_steps=10,
    learning_rate=3e-5,
    weight_decay=0.01,
    warmup_steps=500,
    push_to_hub=False,
    report_to="none",
)

# Define trainer
trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=dataset,
)

# Train the model
trainer.train()

# Save the fine-tuned model
model.save_pretrained(output_dir)
tokenizer.save_pretrained(output_dir)

print(f"Fine-tuned model saved to {output_dir}")
