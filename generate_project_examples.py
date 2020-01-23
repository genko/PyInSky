""" this script copies the python project examples to the project templates offered by the frontend """

import os


# type definition:
# {"project_title": str, "project_files": [{"file_name": str, "file_content": str}]}
projects = []

rootdir = "./public/examples"
for rootdir_name, rootdir_names, _ in os.walk(rootdir):

    for dir_name in rootdir_names:
        project_title = dir_name
        project_files = []

        for dir_name, _, filenames in os.walk(os.path.join(rootdir_name, dir_name)):
            print(dir_name)
            for file_name in filenames:
                with open(os.path.join(dir_name, file_name)) as file_handler:
                    file_content = file_handler.read()

                project_files.append(
                    {"file_name": file_name, "file_content": file_content}
                )
        projects.append(
            {"project_title": project_title, "project_files": project_files}
        )


for project in projects:
    project_files = "{"
    for index, files in enumerate(project["project_files"]):
        project_files += '    "{0}": `{1}`'.format(
            files["file_name"], files["file_content"].replace("\\", "\\\\")
        )
        if index != len(project["project_files"]) - 1:
            project_files += ",\n"
    project_files += "}"

    with open(
        os.path.join(rootdir, project["project_title"] + ".js"), "w"
    ) as file_handler:
        print(
            'examples["{0}"] = {1};'.format(project["project_title"], project_files),
            file=file_handler,
        )

