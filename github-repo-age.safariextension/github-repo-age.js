function getRepoAge(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) return;

		if (xhr.status == 202) {
				setTimeout(function () {
						getRepoAge(url, callback);
				}, 1000);
				return;
		}

		if (xhr.status != 200 || !xhr.responseText) return;

		var data = JSON.parse(xhr.responseText);
		callback(data);
	};

	xhr.open('GET', url, true);
	xhr.send();
}

function insertRepoAge() {
	var url = window.location.pathname;
	var result = /^\/[^\/]+\/[^\/]+/.exec(url);
	if (!result) return;
	url = result[0] + '/graphs/contributors-data';

	var repoName = document.querySelector('.repohead .entry-title strong');
	if (!repoName) return;

		getRepoAge(url, function (data) {
			var age = data[0].weeks[0].w;
			age = window.moment.unix(age).fromNow(true);

			var repoAge = document.createElement('span');
			repoAge.textContent = ' (' + age + ')';
			repoAge.style.fontSize = '16px';
			repoAge.style.color = '#aaa';
			repoName.parentNode.insertBefore(repoAge, repoName.nextSibling);
		});
}

document.addEventListener('DOMContentLoaded', insertRepoAge);