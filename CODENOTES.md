### TESTING ###

    // Temporary folders and files in tests..
    @Rule
    public TemporaryFolder folder = new TemporaryFolder();
    File createdFolder = folder.newFolder("createdFolder");
    File createdFile = folder.newFile("createdFile.txt");