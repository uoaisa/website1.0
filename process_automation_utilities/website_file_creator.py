import os

class FolderCreator:
    def __init__(self, names, output_directory, subfolders):
        self.names = names
        self.output_directory = output_directory
        self.subfolders = subfolders

    def create_folders(self):
        for folder in self.names:
            folder_path = os.path.join(self.output_directory, folder)
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)
                
                for subfolder in self.subfolders:
                    subfolder_path = os.path.join(folder_path, subfolder)
                    if not os.path.exists(subfolder_path):
                        os.makedirs(subfolder_path)

class FileCreator:
    """
    Handles the creation of HTML and CSS files from templates.
    Each file is named and stored in a corresponding subdirectory.
    """

    def __init__(self, names, html_template_path, css_template_path, js_template_path, output_directory):
        """
        Initializes the FileCreator with names, paths, and output directory.

        :param names: List of names for the files.
        :param html_template_path: Path to the HTML template.
        :param css_template_path: Path to the CSS template.
        :param output_directory: Directory where files will be created.
        """
        self.names = names
        self.html_template_path = html_template_path
        self.css_template_path = css_template_path
        self.js_template_path = js_template_path
        self.output_directory = output_directory

    def create_files(self):
        """
        Public method to start the file creation process.
        It creates HTML, CSS, and JavaScript files.
        """
        self._create_html_files()
        self._create_css_files()
        self._create_javascript_files()

    def _create_html_files(self):
        """
        Creates HTML files from the template, customizing each with its name.
        """
        try:
            with open(self.html_template_path, 'r') as template_file:
                template = template_file.read()
        except Exception as e:
            print(f"Error reading HTML template file: {e}")
            return

        for name in self.names:
            self._create_file(template, name, "html")

    def _create_css_files(self):
        """
        Creates CSS files from the template.
        """
        try:
            with open(self.css_template_path, 'r') as template_file:
                template = template_file.read()
        except Exception as e:
            print(f"Error reading CSS template file: {e}")
            return

        for name in self.names:
            self._create_file(template, name, "css")

    def _create_javascript_files(self):
        """
        Creates CSS files from the template.
        """
        try:
            with open(self.js_template_path, 'r') as template_file:
                template = template_file.read()
        except Exception as e:
            print(f"Error reading Js template file: {e}")
            return

        for name in self.names:
            self._create_file(template, name, "js")
    
    def _create_file(self, template, name, file_type):
        """
        Creates a file from a template, customizing it based on type.

        :param template: The file template.
        :param name: The name of the file.
        :param file_type: The type of file ('html', 'css', or 'js').
        """
        subdir = os.path.join(self.output_directory, name)
        os.makedirs(subdir, exist_ok=True)

        file_content = self._customize_content(template, name, file_type)
        file_path = os.path.join(subdir, f"{name}.{file_type}")
        
        try:
            with open(file_path, 'w') as file:
                file.write(file_content)
            print(f"Created {file_type} file: {file_path}")
        except Exception as e:
            print(f"Error creating {file_type} file for {name}: {e}")


    def _customize_content(self, template, name, file_type):
        """
        Customizes the template content based on the file type and name.

        :param template: The template content.
        :param name: The name of the file.
        :param file_type: The type of file ('html' or 'css').
        :return: Customized content as a string.
        """
        customized_content = template
        if file_type == "html":
            customized_content = customized_content.replace("[Section Title]", name)
            css_link = f"<link rel=\"stylesheet\" type=\"text/css\" href=\"{name}.css\">"
            customized_content = customized_content.replace('</head>', f'{css_link}\n</head>')
        return customized_content


def create_folders(names, output_directory, subfolders):
    try:
        folder_creator = FolderCreator(names, output_directory, subfolders)
        folder_creator.create_folders()
        print("Folders have been created successfully.")
    except Exception as e:
        print(f"An error occurred while creating folders: {e}")

def create_files(names, html_template_path, css_template_path, js_template_path, output_directory):
    try:
        file_creator = FileCreator(names, html_template_path, css_template_path, js_template_path, output_directory)
        file_creator.create_files()
        print("Files have been created successfully.")
    except Exception as e:
        print(f"An error occurred while creating files: {e}")

def main():
    names = ["Events", "Projects", "Resources", "Contact"]
    subfolders = ['utilities', 'media', 'styling', 'documents', 'subpages']
    html_template_path = "aisa_html_template1.html"
    css_template_path = "aisa_html_template1.css"
    js_template_path = "aisa_js_template1.js"
    output_directory = "file_output"

    print("Starting the folder creation process...")
    create_folders(names, output_directory, subfolders)

    print("Starting the file creation process...")
    create_files(names, html_template_path, css_template_path, js_template_path, output_directory)

if __name__ == "__main__":
    main()