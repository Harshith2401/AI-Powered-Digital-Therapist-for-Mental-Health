from datasets import load_dataset, Dataset
import os

cache_dir = r".cache/huggingface"  # Cache directory for datasets
dataset_save_dir = "mental_health_counseling_processed"  # Directory to save the processed dataset

def load_and_process_dataset():
    # Load dataset from Hugging Face
    dataset = load_dataset("Amod/mental_health_counseling_conversations", cache_dir=cache_dir)

    # Combine train split (this dataset only has "train")
    combined_data = []
    for example in dataset["train"]:
        context = example['Context']  # User's input
        response = example['Response']  # Therapist's response
        combined_data.append({"text": f"User: {context}\nAI: {response}"})  # Format as conversation

    # Reduce dataset size if needed (e.g., 500 samples for testing)
    combined_data = combined_data[:10000]  # Adjust or remove this line if you want the full dataset

    # Convert to Hugging Face Dataset format
    processed_dataset = Dataset.from_list(combined_data)

    # Save processed dataset
    if not os.path.exists(dataset_save_dir):
        os.makedirs(dataset_save_dir)
    processed_dataset.save_to_disk(dataset_save_dir)

    print(f"Processed dataset saved to {dataset_save_dir}")
    return dataset_save_dir

# Execute processing
save_path = load_and_process_dataset()
