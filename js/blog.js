/**
 * blog.js Copyright (C) 2014 hasnaer <hasnae.rehioui@gmail.com>
 * 
 * Distributed under terms of the MIT license.
 */

$(function() {

  var pagePath = window.location.pathname;
  var pageName = (pagePath == '/') ? 'main' : pagePath.substring(1,
      pagePath.length - 1);

  $.getJSON("/__pages/" + pageName + ".json", function(config) {

    // navigation
    var navigation = new EJS({
      url : '/__views/navigation.ejs'
    });
    $("#blog-navigation").replaceWith(navigation.render({
      nav : config.nav
    }));

    // footer
    var footer = new EJS({
      url : '/__views/footer.ejs'
    });
    $("#blog-footer").replaceWith(footer.render({
      footer : config.footer
    }));

    // content
    var content = new EJS({
      url : pagePath + 'content.ejs'
    });
    $("#blog-content").replaceWith(content.render({
      content : config.content
    }));

    // sidebar
    var sidebar = new EJS({
      url : '/__views/sidebar.ejs'
    });
    $("#blog-sidebar").replaceWith(sidebar.render({
      widgets : config.sidebar.widgets.map(function(widget) {
        return {
          render : function() {
            return new EJS({
              url : '/__widgets/' + widget.name + '.ejs'
            }).render(widget.data);
          }
        }
      })
    }));
  });

});