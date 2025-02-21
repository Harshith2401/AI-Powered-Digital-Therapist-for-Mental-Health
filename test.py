from datasets import load_dataset

# Load the dataset
dataset = load_dataset("Amod/mental_health_counseling_conversations", cache_dir=".cache/huggingface")

# Print dataset structure
print(dataset)

# Print sample data
print(dataset['train'][0])  # Print the first sample in the training set
