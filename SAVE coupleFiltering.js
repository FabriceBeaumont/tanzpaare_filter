document.addEventListener('DOMContentLoaded', () => {
    let allCouples = [];

    /* Load the couples from the JSON file */
    function fetchCouples() {
        fetch('couples.json')
            .then(response => response.json())
            .then(data => {
                allCouples = data;
                renderCouples(allCouples);
            })
            .catch(error => console.error('Error fetching couples data:', error));
    }

    /* Funciton to render the couples individually */
    function renderCouples(couples) {
        const coupleList = document.getElementById('couple-list');
        coupleList.innerHTML = '';

        couples.forEach(couple => {
            const coupleDiv = document.createElement('div');
            coupleDiv.className = 'couple-item';

            // Create a div for the couples names
            const namesDiv = document.createElement('div');
            namesDiv.textContent = `${couple.firstnameLeader} ${couple.lastnameLeader}`;
            if (couple.firstnameFollower && couple.lastnameFollower) {
                namesDiv.textContent += ` & ${couple.firstnameFollower} ${couple.lastnameFollower}`;
            }
            namesDiv.className = 'bold';
            coupleDiv.appendChild(namesDiv);


            // Create a spans for the age group
            if (couple.ageGroups && couple.ageGroups.length > 0) {
                // Create a div for the latin level
                const ageGroupsDiv = document.createElement('div');
                ageGroupsDiv.className = 'dance-info';

                // Create a span for the decriptive text of the latin level
                const ageGroupsTitleSpan = document.createElement('span');
                ageGroupsTitleSpan.className = 'bold';
                ageGroupsTitleSpan.textContent = 'Altersklassen: ';

                // Create a span for the actual latin level
                const ageGroupsSpan = document.createElement('span');
                ageGroupsSpan.textContent = `${couple.ageGroups.join(', ')}`;

                // Append the spans to the div
                ageGroupsDiv.appendChild(ageGroupsTitleSpan);
                ageGroupsDiv.appendChild(ageGroupsSpan);
                coupleDiv.appendChild(ageGroupsDiv);
            }

            // Create a spans for the latin level
            if (couple.danceLevelLatin && couple.danceLevelLatin.length > 0) {
                // Create a div for the latin level
                const danceLevelLatin = document.createElement('div');
                danceLevelLatin.className = 'dance-info';

                // Create a span for the decriptive text of the latin level
                const LatinLevelTitleSpan = document.createElement('span');
                LatinLevelTitleSpan.className = 'bold';
                LatinLevelTitleSpan.textContent = 'Leistungsklasse Latein: ';

                // Create a span for the actual latin level
                const latinLevelSpan = document.createElement('span');
                latinLevelSpan.textContent = couple.danceLevelLatin;

                // Append the spans to the div
                danceLevelLatin.appendChild(LatinLevelTitleSpan);
                danceLevelLatin.appendChild(latinLevelSpan);
                coupleDiv.appendChild(danceLevelLatin);
            }

            // Create a spans for the ballroom level
            if (couple.danceLevelBallroom && couple.danceLevelBallroom.length > 0) {
                // Create a div for the latin level
                const danceLevelBallroom = document.createElement('div');
                danceLevelBallroom.className = 'dance-info';

                // Create a span for the decriptive text of the latin level
                const BallroomLevelTitleSpan = document.createElement('span');
                BallroomLevelTitleSpan.className = 'bold';
                BallroomLevelTitleSpan.textContent = 'Leistungsklasse Standard: ';

                // Create a span for the actual latin level
                const ballroomLevelSpan = document.createElement('span');
                ballroomLevelSpan.textContent = couple.danceLevelBallroom;

                // Append the spans to the div
                danceLevelBallroom.appendChild(BallroomLevelTitleSpan);
                danceLevelBallroom.appendChild(ballroomLevelSpan);
                coupleDiv.appendChild(danceLevelBallroom);
            }

            if (couple.instagram.length > 0) {
                const instagramDiv = document.createElement('div');

                // Create a span for the decriptive text of the latin level
                const instagramTitleSpan = document.createElement('span');
                instagramTitleSpan.className = 'bold';
                instagramTitleSpan.textContent = 'Instagram: ';

                instagramSpan = document.createElement('span');
                instagramSpan.innerHTML = couple.instagram.map(account => `<a href="https://www.instagram.com/${account}" target="_blank">${account}</a>`).join(', ');
                instagramDiv.appendChild(instagramTitleSpan);
                instagramDiv.appendChild(instagramSpan);
                coupleDiv.appendChild(instagramDiv);
            }

            if (couple.dancesportinfo != "") {
                const dsiDiv = document.createElement('div');
                dsiDiv.innerHTML = 'DanceSportInfo.net: ' + `<a href="${couple.dancesportinfo}" target="_blank">${account}</a>`;
                coupleDiv.appendChild(dsiDiv);
            }

            coupleDiv.dataset.ageGroups = JSON.stringify(couple.ageGroups);
            coupleDiv.dataset.latinLevel = JSON.stringify(couple.danceLevelLatin);
            coupleDiv.dataset.ballroomLevel = JSON.stringify(couple.danceLevelBallroom);
            coupleDiv.dataset.names = `${couple.firstnameLeader} ${couple.lastnameLeader} ${couple.firstnameFollower} ${couple.lastnameFollower}`;

            coupleList.appendChild(coupleDiv);
        });

        updateCoupleDisplay();
    }

    function updateCoupleDisplay() {
        const ageGroupsFilter = document.getElementById('age-group-filter').value;
        const latinLevelFilter = document.getElementById('latin-level-filter').value;
        const ballroomLevelFilter = document.getElementById('ballroom-level-filter').value;
        const nameFilter = document.getElementById('name-filter').value.toLowerCase();

        document.querySelectorAll('.couple-item').forEach(coupleDiv => {
            // Read the couple data from the dataset - and if not present define default zero-values here
            const ageGroups = coupleDiv.dataset.ageGroups ? JSON.parse(coupleDiv.dataset.ageGroups) : [];
            // const latinLevel = coupleDiv.dataset.latinLevel || '';
            const latinLevel = coupleDiv.dataset.latinLevel ? JSON.parse(coupleDiv.dataset.latinLevel) : [];
            const ballroomLevel = coupleDiv.dataset.ballroomLevel ? JSON.parse(coupleDiv.dataset.ballroomLevel) : [];
            const names = coupleDiv.dataset.names ? coupleDiv.dataset.names.toLowerCase() : '';

            // Check all match conditions
            const ageGroupsMatch = ageGroupsFilter === 'all' || (ageGroups.length > 0 && ageGroups.includes(ageGroupsFilter));
            // const latinLevelMatch = latinLevelFilter === 'all' || (latinLevel && latinLevel === latinLevelFilter);
            const latinLevelMatch = latinLevelFilter === 'all' || (latinLevel && latinLevel.includes(latinLevelFilter));
            const ballroomLevelMatch = ballroomLevelFilter === 'all' || (ballroomLevel && ballroomLevel.includes(ballroomLevelFilter));
            const nameMatch = nameFilter === '' || names.includes(nameFilter);

            // Apply filtering
            if (ageGroupsMatch && latinLevelMatch && latinLevelMatch && ballroomLevelMatch && nameMatch) {
                coupleDiv.style.display = 'block';
            } else {
                coupleDiv.style.display = 'none';
            }
        });
    }

    document.getElementById('age-group-filter').addEventListener('change', updateCoupleDisplay);
    document.getElementById('latin-level-filter').addEventListener('change', updateCoupleDisplay);
    document.getElementById('ballroom-level-filter').addEventListener('change', updateCoupleDisplay);
    document.getElementById('name-filter').addEventListener('input', updateCoupleDisplay);

    document.getElementById('reset-filters').addEventListener('click', () => {
        document.getElementById('age-group-filter').value = 'all';
        document.getElementById('latin-level-filter').value = 'all';
        document.getElementById('ballroom-level-filter').value = 'all';
        document.getElementById('name-filter').value = '';

        updateCoupleDisplay();
    });

    fetchCouples();
});