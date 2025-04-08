import fitz

# Define the swap pattern for an 8-page block
swap_pattern = [1, 3, 5, 7, 4, 2, 8, 6]

def reorder_pdf(input_pdf, output_pdf):
  doc = fitz.open(input_pdf)
  num_pages = len(doc)

  # Trim the document down to the nearest multiple of 8 if needed
  trimmed_pages = num_pages - (num_pages % 8)

  if trimmed_pages < num_pages:
    print(f"Trimming {num_pages - trimmed_pages} pages to make it a multiple of 8.")

  new_doc = fitz.open()

  # Process the document in chunks of 8 pages
  for base in range(0, trimmed_pages, 8):
    swaps = [base + i for i in swap_pattern]  # Adjust swap pattern for the current block
    for swap in swaps:
      new_doc.insert_pdf(doc, from_page=swap - 1, to_page=swap - 1)  # PyMuPDF is zero-indexed

  # Save the reordered PDF
  new_doc.save(output_pdf)
  new_doc.close()
  doc.close()

# Example usage
input_pdf = "GenkiTextbookVol1.pdf"
output_pdf = "GenkiTextbookReorderedVol1.pdf"
reorder_pdf(input_pdf, output_pdf)