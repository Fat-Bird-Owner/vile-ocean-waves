import os
import hjson

content_dir = "../content"
docs_dir = "../docs"

for folder in os.listdir(content_dir):
    folder_path = os.path.join(content_dir, folder)

    if not os.path.isdir(folder_path):
        continue

    output_folder = os.path.join(docs_dir, folder)
    os.makedirs(output_folder, exist_ok=True)

    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if not file.endswith(".hjson"):
                continue

            path = os.path.join(root, file)

            with open(path, "r") as f:
                data = hjson.load(f)

            name = data.get("name", file[:-6])
            description = data.get("description", "No description.")

            page = f"""# {name}

Type: `{folder}`

## Description

{description}

## Stats

"""

            ignored = [
                "name",
                "description"
            ]

            for key, value in data.items():
                if key not in ignored:
                    page += f"- **{key}**: `{value}`\n"


            out = os.path.join(
                output_folder,
                file.replace(".hjson", ".md")
            )

            with open(out, "w") as f:
                f.write(page)

            print("Generated", out)
