/**!
 Library
 Library module with Cart in local storage

 @contributors: Guillaume (Alsacréations), Rodolphe
 @date-created: 2015-05-20
 @last-update: 2016-02-05
 */

(function($) {

    $.cxpLibrary = function(el, options) {

        var defaults = {
            // @PROD : Edit real AJAX request URL here
            downloadurl:'dev/ajax/library-download.php'
        };

        var plugin = this;
        plugin.settings = {};
        var $element = $(el),
            element = el,
            lsPrefix = 'cxpCart_', //prefix for the localstorage
            id = $element.data('cartId'), //id for name the localstorage
            cart = {
                'folders': {},
                'items': {}
            }, //object Cart
            $modal = $('#modal' + id), //modal basket
            $modalPreview = $('#modalPreview' + id), //modal preview
            cxpStorage = localStorage, //Define storage type
            cartButton = $('[data-cart-id="' + id + '"]').find('.lb-js-btn'); // CartButton

        // Plugin initialization
        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);
            plugin.lsGet();
            if ($element.find('.lb-js-folder').length > 0) {
                updateFoldersInfos();
            }
            if ($element.find('.lb-js-item').length > 0) {
                updateItemsInfos();
            }
            updateCartButton();
            updateTotalLength();
            registerEvents();

            return true;
        };

        // LocalStorage Actions
        // get
        plugin.lsGet = function() {
            var cartRaw = cxpStorage.getItem(lsPrefix + id);
            if (cartRaw !== null) {
                cart = JSON.parse(cartRaw);
            } else {
                plugin.lsSet();
            }
        };

        // set
        plugin.lsSet = function() {
            var cartRaw = JSON.stringify(cart);
            cxpStorage.setItem(lsPrefix + id, cartRaw);
        };

        // remove
        plugin.lsRemove = function() {
            cxpStorage.removeItem(lsPrefix + id);
        };

        // length
        plugin.getLength = function(folder) {
            if (folder !== undefined) {
                if (cart.folders[folder] === undefined) {
                    return 0;
                }
                return Object.keys(cart.folders[folder]).length;
            } else {
                return Object.keys(cart.items).length;
            }
        };

        // UPDATE method
        var updateCartButton = function() {
            var nbItem = plugin.getLength();
            cartButton.removeClass('btn-invert').removeClass('btn-primary');
            if (nbItem > 0) {
                cartButton.attr('class', 'btn-primary ' + cartButton.attr('class'));
            } else {
                cartButton.attr('class', 'btn-invert ' + cartButton.attr('class'));
            }
            cartButton.find('.nb').text(nbItem);

            //Update length for the button inside modal
        };

        var updateFoldersInfos = function() {
            var $folders = $('.lb-js-folder');

            $folders.each(function() {
                var nbSelected = plugin.getLength($(this).data('folderId'));
                if (nbSelected > 0) {
                    $(this).find('.lb-list-link').addClass('is-selected');
                } else {
                    $(this).find('.lb-list-link').removeClass('is-selected');
                }
                $(this).find('.lb-list-infos').find('.nb').text(nbSelected);

            });

        };

        // Check the items if they are stored in the cart
        var updateItemsInfos = function() {
            var $items = $('.lb-js-item');
            $items.each(function() {
                if (cart.items[$(this).data('itemId')] !== undefined) {
                    $(this).find('.lb-js-item-checkbox').prop('checked', 'checked');
                    $(this).find('.lb-select-list-link').removeClass('is-checked').addClass('is-checked');
                } else {
                    $(this).find('.lb-js-item-checkbox').prop('checked', false);
                    $(this).find('.lb-select-list-link').removeClass('is-checked');
                }
            });
        };

        var updateTotalLength = function() {
            var TotalLength = 0;
            $.each(cart.items, function() {
                TotalLength += this.itemLength;
            });
            $modal.find('.lb-js-modal-download .lb-js-total').text(TotalLength);
        };

        // Event Handlers on HTML components inside the plugin
        var registerEvents = function() {

            $element.on('click.library', '.lb-js-item-checkbox', plugin.itemAction);
            $element.on('click.library', '.lb-select-list-link', plugin.itemPreview); // Galery previews
            $element.on('click.library', '.lb-js-btn', plugin.regenModalAction); // Download basket
            $modal.on('click.library', '.lb-js-modal-drop-all', plugin.resetCartAction);
            $modal.on('click.library', '.lb-js-modal-btn-drop-item', plugin.deleteFromCartAction);

            // If there is a pagination
            $element.on('pagechange','.cxp-pagination', function() {
                updateItemsInfos();
            });

            // Download link
            $modal.on('click.library','.lb-js-modal-download', function(e) {
                // Temporary hidden form to build a POST request
                var $form = $('<form>').attr({ "target": "_blank", "id": "downloadForm", "method": "POST", "action": plugin.settings.downloadurl }).hide();
                // For each cart item we use a hidden input field to POST the id
                $.each(cart.items, function() {
                    $form.append('<input type="hidden" name="files[]" value="'+this.itemId+'">');
                });
                $('body').append($form);
                $form.submit();
                setTimeout(function() {
                    $form.remove(); // Remove the temporary form
                },3000);
            });

        };

        // Actions

        // Update cart modal content (folder and items)
        plugin.regenModalAction = function(e) {
            var nbItem = plugin.getLength(),
                $modalContent = $modal.find('.lb-js-modal-content'),
                $template = $('#tpl-lb-js-modal-content').html();
            var cft = plugin.prepareCartForTemplate(); // Cart template
            if (nbItem > 0) {
                $('.lb-js-modal-drop-all, .lb-js-modal-download').show();
                $modalContent.html($.mustache($template, cft));
            } else {
                $('.lb-js-modal-drop-all, .lb-js-modal-download').hide();
                $('.lb-js-modal-content').html('<p>Le panier est vide.</p>');
            }
            updateTotalLength();
        };

        // Item checkbox click
        plugin.itemAction = function() {
            if ($(this).prop("checked")) {
                plugin.addToCart($(this));
            } else {
                plugin.removeFromCart($(this));
            }
            plugin.lsSet();
            updateCartButton();
            updateItemsInfos();
            updateTotalLength();
        };

        // Item click to display big modal preview
        plugin.itemPreview = function() {

            // Update modal window contents
            var $item = $(this).closest('.lb-js-item');

            $modalPreview.find('.lp-item-title').text($(this).find('.lb-select-list-title').text());
            $modalPreview.find('.lp-item-desc').text($(this).find('.lb-select-list-legend').text());
            $modalPreview.find('.lp-item-copy').text($(this).find('.lb-select-list-copyright').text());
            $modalPreview.find('.lp-item-size').text($(this).find('.lb-select-list-infos').text());
            if ($item.find('.lb-js-item-checkbox').is(":checked")) {
                $modalPreview.find('.lp-js-item-btn-add').hide();
                $modalPreview.find('.lp-js-item-btn-remove').show();
            } else {
                $modalPreview.find('.lp-js-item-btn-add').show();
                $modalPreview.find('.lp-js-item-btn-remove').hide();
            }

            // Iframe or img ?
            if($item.data("itemIframe")) {
                $('.lp-item-preview',$modalPreview).html('<iframe class="lp-item-iframe" src="'+$item.data("itemSrc")+'" style="border:0" scrolling="no"></iframe>');
            } else {
                $('.lp-item-preview',$modalPreview).html('<img class="lp-item-img" src="'+$item.data("itemPreview")+'" alt="'+$item.data("itemName")+'">');
            }

            // Binding
            $modalPreview.find('.lp-js-item-btn').off('click.library').on('click.library', function(e) {
                e.preventDefault();
                $item.find('.lb-js-item-checkbox').trigger('click.library');
                if ($item.find('.lb-js-item-checkbox').is(":checked")) {
                    $modalPreview.find('.lp-js-item-btn-add').hide();
                    $modalPreview.find('.lp-js-item-btn-remove').show();
                } else {
                    $modalPreview.find('.lp-js-item-btn-add').show();
                    $modalPreview.find('.lp-js-item-btn-remove').hide();
                }
            });

            // resize img after load
            var $img = $modalPreview.find('.lp-item-img');
            if($img.length>0) {
                $img.hide().load(plugin.resizeImgAction).fadeIn('50');
            }

        };

        // Reset Cart
        plugin.resetCartAction = function(e) {
            e.preventDefault();
            cart = {
                'folders': {},
                'items': {}
            };
            plugin.lsSet();
            plugin.regenModalAction();
            updateCartButton();
            updateItemsInfos();
            updateFoldersInfos();
            updateTotalLength();
        };

        plugin.deleteFromCartAction = function(e) {
            e.preventDefault();
            plugin.removeFromCart($(this));
            plugin.lsSet();
            plugin.regenModalAction();
            updateCartButton();
            updateItemsInfos();
            updateFoldersInfos();
            updateTotalLength();
        };

        // SubAction
        // Add item to selection
        plugin.addToCart = function($elem) {
            var itemData = $elem.closest('.lb-js-item').data();
            cart.items[itemData.itemId] = itemData;
            if (cart.folders[itemData.itemFolderId] === undefined) {
                cart.folders[itemData.itemFolderId] = {};
            }
            cart.folders[itemData.itemFolderId][itemData.itemId] = itemData;
        };
        // Remove from selection
        plugin.removeFromCart = function($elem) {
            var itemData;
            if ($elem.hasClass('lb-js-modal-btn-drop-item')) {
                itemData = cart.items[$elem.data('itemId')];
            } else {
                itemData = $elem.closest('.lb-js-item').data();
            }
            delete cart.items[itemData.itemId];
            delete cart.folders[itemData.itemFolderId][itemData.itemId];
        };

        // Populate data with checked items in order to build mustache template
        plugin.prepareCartForTemplate = function() {
            var cft = []; // Cart For Template
            // Loop to get JSON data
            Object.keys(cart.folders).forEach(function(folderKey) {
                var items = [];
                var folderName = '';
                var folder = '';
                Object.keys(cart.folders[folderKey]).forEach(function(itemKey) {
                    items.push(cart.folders[folderKey][itemKey]);
                    folderName = cart.folders[folderKey][itemKey].itemFolderName;
                });
                folder = '{ "folderId":"' + folderKey + '","folderName":"' + folderName + '", "items":' + JSON.stringify(items) + ' }';
                cft.push(JSON.parse(folder));
            });

            return JSON.parse('{"folders":' + JSON.stringify(cft) + '}');
        };

        // Resize image
        plugin.resizeImgAction = function(e) {
            var $img = $modalPreview.find('.lp-item-img'),
                //$modal = $modalPreview,
                modalHeight = $modalPreview.height() - parseInt($img.css('marginTop')),
                modalWidth = $modalPreview.width(),
                imgHeight = $img[0].naturalHeight,
                imgWidth = $img[0].naturalWidth,
                imgMaxHeight = modalHeight;

             var newHeight = 0,
                 newWitdh = 0,
                 ratio = 1;

             if (imgMaxHeight < imgHeight) {
                 newHeight = imgMaxHeight;
                 ratio = imgMaxHeight / imgHeight;
                 newWidth = imgWidth * ratio;
                 // Adjust for width too large
                 if (newWidth > modalWidth) {
                     newHeight = (modalWidth / newWidth) * newHeight;
                     newWidth = modalWidth;
                 }

             } else if (imgWidth >= modalWidth) {
                 newHeight = (modalWidth / imgWidth) * imgHeight;
                 newWidth = modalWidth;
                 // Adjust for width too large
                 if (newHeight > imgMaxHeight) {
                     newWidth = (imgMaxHeight / imgHeight) * newWidth;
                     newHeightWidth = modalHeight;
                 }
             } else {
                 newWidth = imgWidth;
                 newHeight = imgHeight;
             }

            $img.height(newHeight);
            $img.width(newWidth);
            $img.margin = 'auto';

        };

        plugin.init();
    };

    $.fn.cxpLibrary = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('cxpLibrary')) {
                var plugin = new $.cxpLibrary(this, options);
                $(this).data('cxpLibrary', plugin);
            }
        });
    };

    $('.lb-js').cxpLibrary();

    // For Filter add toggle slide

    $('.lb-js-filter').toggleSlide();

})(jQuery);
