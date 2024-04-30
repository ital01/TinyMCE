/*
https://moovcmcajamar.softhouse.inf.br/modelos.getmodelos
https://moovcmcajamar.softhouse.inf.br/modelos/d55459a4c02a5b51680e38b42860d1689cacca5b.html
*/
    function initEditor(){
        return new Promise(function(resolve, reject){
            $.getJSON( "/modelos.getmodelos", function( modelos ) {            

                tinymce.init({
                    selector: 'textarea#txaeditor',
                    height: 600,
                    theme: 'modern',
                    statusbar: false,
                    language: 'pt_BR',
                    max_body_height: 1154,
                    plugins: [
                        'advlist autolink lists link image charmap hr anchor',
                        'searchreplace wordcount visualblocks visualchars code ',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help image code table'
                    ],

                    template_cdate_classes: "cdate creationdate",
                    template_cdate_format: "%d/%m/%Y",
                    template_replace_values: {
                    protocolo: '{!! (isset($protocolo)? $protocolo->num_prot_completo:"NUM_PROTOCOLO_NAO_ENCONTRADO") !!}',
                    usuario_maiusculo: '{!! strtoupper(\Illuminate\Support\Facades\Auth::user()->nome) !!}',
                    usuario: '{!! \Illuminate\Support\Facades\Auth::user()->nome !!}',
                    cargo: '{!! \Illuminate\Support\Facades\Auth::user()->cargo !!}',
                    cpf: '{!! \Illuminate\Support\Facades\Auth::user()->cpf !!}',
                    matricula: '{!! \Illuminate\Support\Facades\Auth::user()->matricula !!}',
                    departamento: '{!! \Illuminate\Support\Facades\Auth::user()->getNomeDepartamento() !!}',
                    ano: '{!! \App\Library\Configuracoes::getAnoAtual() !!}',
                    data: '{!! \App\Library\Configuracoes::getDataAtual() !!}',
                    hora: '{!! \App\Library\Configuracoes::getHoraAtual() !!}',
                    data_ext: dataporextenso('{!! \App\Library\Configuracoes::getDateTimeNow() !!}'),
                    },
                    fontsize_formats: "6pt 7pt 8pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 28pt 30pt 32pt 34pt 36pt",
                                        
                    content_css: '/src/vendor/tinymce/custom_css/custom.css',
                    //theme_advanced_fonts : "Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n",
                    font_formats: 'Calibri=calibri,Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
                    fullpage_default_font_family: "Calibri, Georgia, Serif;",
                    branding: false,
                    block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3',
                    toolbar1: 'undo redo | insert | fontselect | fontsizeselect | bold italic | forecolor backcolor ',
                    toolbar2: 'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table | styleselect | template | print',

                    image_advtab: true,
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',

                    templates: modelos,

                    file_picker_callback: function (cb, value, meta) {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        input.onchange = function () {
                            var file = this.files[0];
                            var reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = function () {
                                var id = 'blobid' + (new Date()).getTime();
                                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                var blobInfo = blobCache.create(id, file, reader.result);
                                blobCache.add(blobInfo);
                                cb(blobInfo.blobUri(), {title: file.name});
                            };
                        };
                        input.click();
                    },

                    setup: function (ed) {
                                        
                        ed.on('init', function (ed) {
                            var bd = $("#txaeditor_ifr").contents().find("#tinymce");
                            bd.removeClass("mce-content-body");
                            bd.empty();
                            bd.append("<div class='nbody' id='nbody'><div id='mce-content-body' class='mce-content-body'><br></div></div>");										
                            ed.target.editorCommands.execCommand("fontName", false, "Arial");   
                            
                            console.log($('#url_modelo_documento').val());
                            if($('#url_modelo_documento').val() != ''){
                                $.get($('#url_modelo_documento').val(), function(data){
                                    ed.target.setContent(data);
                                });                        
                            }

                            $('#nome_doc').focus();
                            resolve();
                        });
                        
                        // ed.on('init', function (ed) {									
                        //     ed.target.editorCommands.execCommand("fontName", false, "Arial");   
                        // });				
                    },


                });
            });    
        }); 
    }