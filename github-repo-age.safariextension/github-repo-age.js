function insertRepoAge() {
	var url = window.location.pathname;
	var result = /^\/[^\/]+\/[^\/]+/.exec(url);
	if (!result) return;
	url = result[0] + '/graphs/contributors-data';

	var repoName = document.querySelector('.repohead .entry-title strong');
	if (!repoName) return;

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) return;

		var data = JSON.parse(xhr.responseText);
		var age = data[0].weeks[0].w;
		age = window.moment.unix(age).fromNow(true);

		var repoAge = document.createElement('span');
		repoAge.textContent = ' (' + age + ')';
		repoAge.style.fontSize = '16px';
		repoAge.style.color = '#aaa';
		repoName.parentNode.insertBefore(repoAge, repoName.nextSibling);
	};

	xhr.open('GET', url, true);
	xhr.send();
}

document.addEventListener('DOMContentLoaded', insertRepoAge);