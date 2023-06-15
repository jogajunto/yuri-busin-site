# This scripts removes all comments from Markdown files in a directory.
# Comments are usually added to Markdown when the user copies and pastes content from a Google Doc.
# Comments does not impact the rendered HTML, but it does make the Markdown files harder to read.

import os
import re

# Define the directory where your Markdown files are located
directory = "content"

# Initialize a regular expression pattern to match Markdown comments
comment_pattern = r"<!--.*?-->"

# Iterate over each file in the directory
for filename in os.listdir(directory):
	if filename.endswith(".md"):
		file_path = os.path.join(directory, filename)
			
		# Read the contents of the file
		with open(file_path, "r") as file:
			content = file.read()
			
		# Remove comments from the content using regex
		content_without_comments = re.sub(comment_pattern, "", content, flags=re.DOTALL)
			
		# Write the updated content back to the file
		with open(file_path, "w") as file:
			file.write(content_without_comments)
