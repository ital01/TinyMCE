tinymce.init({
    selector: 'div#texteditor',
    language: 'pt_BR',
    statusbar: false,
    plugins: 'preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion template wordcount',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | save print | ltr rtl | wordcount",
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    importcss_append: true,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: 'oxide',
    content_css: 'document.css',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    resize: true,
    min_height: 900,

    templates: [
      {
        title: 'Não editável',
        description: 'Modelo não editável',
        url: 'templates/table1.html'
      },
      {
        title: 'Tabela',
        description: 'Tabela simples',
        url: 'templates/table2.html'
      }
    ],
});