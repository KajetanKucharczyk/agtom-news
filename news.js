$('head').append('<link rel="stylesheet" href="styles.css" type="text/css" />');
$('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');

function generateNews(item, destination) {	
	
	var id = "image_" + Math.random()
	var result
	id = id.replace(".", "")
	
	$.ajax({
		type: "POST",
		url: "news.php",
		async: "false",
		data: { 
			last: item
		},
		success: function(data){
		
			data = JSON.parse(data)
		
			//STRUKTURA
			element = $("<div>")
			title = $("<div>")
			date = $("<div>")
			content_box = $("<div>")
				image = $("<div>")
				image.append("<div>")
				content = $("<div>")
							
			//KLASY + ID
			element.addClass("news")
			title.addClass("news__title")					
			date.addClass("news__date")
			content_box.addClass("news__conatiner")
			image.addClass("news__conatiner--image-box")
			image.children("div").addClass("image-box--image")
			image.children("div").attr("id", id)
			content.addClass("news__conatiner--content")
			
			//WYPEŁNIENIE
			title.html(data["title"])
			
			image.children("div").css({
				"background-image": "url(" + data["content"][0]["image"] + ")"
			})
			//image_preview(item, image.children("img"), data["content"])			
			date.html(data["date"])
			
			//TREŚĆ
			var content_text = $("<div>")
			for(j = 0; j < data["content"].length; j++) {
			
				content_text.append("<div>")
				content_text.children("div").eq(j).append("<a>")
				content_text.children("div").eq(j).children("a").addClass("content--url")
				content_text.children("div").eq(j).children("a").attr("href", data["content"][j]["url"])
				content_text.children("div").eq(j).children("a").attr("counter", j)
				content_text.children("div").eq(j).children("a").addClass("id-" + id)
				content_text.children("div").eq(j).children("a").append("<div>")
				content_text.children("div").eq(j).children("a").children("div").addClass("content--name")
				content_text.children("div").eq(j).children("a").children("div").text(data["content"][j]["name"])
			
			}
			content.html(content_text)
			
			//WYŚWIETLANIE
			content_box
				.append(image)
				.append(content)
			element
				.append(title)
				.append(date)
				.append(content_box)
			$(destination).append(element)
			
			//NAJECHANIE
			var last_counter
			$("a")
				.mouseover(function() {
					if($(this).hasClass("id-" + id)){
						
						// clearInterval(interval[item])
						last_counter = $(this).attr("counter")
						$("#" + id).css({
							"background-image": "url(" + data["content"][last_counter]["image"] + ")"
						})
						
					}
				})
				.mouseout(function() {
					//image_preview(item, image.children("img"), data["content"], last_counter)
				})
		
		}		
	})	
}		

function image_preview(item, element, data, counter = 1) {
	
	console.log(interval)

	var src = ""

	interval[item] = setInterval(function() {
	
		var count = data.length
		src = data[counter]["image"]
		element.attr("src", src)
		
		if(++counter == count)
			counter = 0
	
	}, 1000)		

}