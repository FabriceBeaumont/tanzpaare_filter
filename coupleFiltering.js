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

    /* Function to render the couples individually */
    function renderCouples(couples) {
        const coupleList = document.getElementById('couple-list');
        coupleList.innerHTML = '';

        couples.forEach(couple => {
            const coupleDiv = document.createElement('div');
            coupleDiv.className = 'couple-item';

            // Create an image element for the couple's image, if present or not the empty string
            if (couple.image) {
                const img = document.createElement('img');
                img.src = couple.image;
                // For the alternative text use the name of the leader
                img.alt = `${couple.firstnameLeader} ${couple.lastnameLeader}`;
                // and, if present the name of the follower as well
                if (couple.firstnameFollower && couple.lastnameFollower) {
                    img.alt += ` & ${couple.firstnameFollower} ${couple.lastnameFollower}`;
                }
                img.className = 'couple-image';
                coupleDiv.appendChild(img);
            }

            // Create a div for the text. We will append all text data to this one
            const textDiv = document.createElement('div');
            textDiv.className = 'couple-text';

            // Create a div for the couples names
            const namesDiv = document.createElement('div');
            namesDiv.textContent = `${couple.firstnameLeader} ${couple.lastnameLeader}`;
            if (couple.firstnameFollower && couple.lastnameFollower) {
                namesDiv.textContent += ` & ${couple.firstnameFollower} ${couple.lastnameFollower}`;
            }
            namesDiv.className = 'bold';

            textDiv.appendChild(namesDiv);


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
                textDiv.appendChild(ageGroupsDiv);
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
                textDiv.appendChild(danceLevelLatin);
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
                textDiv.appendChild(danceLevelBallroom);
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
                textDiv.appendChild(instagramDiv);
            }

            // Render the dancesportinfo.net link, if present
            if (couple.dancesportinfo && couple.dancesportinfo.trim() !== "") {
                const dsiDiv = document.createElement('div');
                const account = "DanceSportInfo.net";
                dsiDiv.innerHTML = `<a href="${couple.dancesportinfo}" target="_blank">${account}</a>`;
                textDiv.appendChild(dsiDiv);
            }

            // Render the WDSF athlete link for the leader, if present
            if (couple.wdsfCouple && couple.wdsfCouple.trim() !== "") {
                const wdsfLeaderDiv = document.createElement('div');
                const name_leader = couple.firstnameLeader;
                const name_follower = couple.firstnameFollower;
                wdsfLeaderDiv.innerHTML = `<a href="${couple.wdsfCouple}" target="_blank">WDSF couple ${name_leader} & ${name_follower}</a>`;
                textDiv.appendChild(wdsfLeaderDiv);
            }
            // Add the text data to the couple div
            coupleDiv.appendChild(textDiv);

            // Save the data to the div as well. This way it is easily accessable for the filter logic
            coupleDiv.dataset.firstnameLeader = couple.firstnameLeader;
            coupleDiv.dataset.lastnameLeader = couple.lastnameLeader;
            coupleDiv.dataset.firstnameFollower = couple.firstnameFollower || '';
            coupleDiv.dataset.lastnameFollower = couple.lastnameFollower || '';
            coupleDiv.dataset.ageGroups = JSON.stringify(couple.ageGroups || []);
            coupleDiv.dataset.latinLevel = couple.danceLevelLatin || '';
            coupleDiv.dataset.ballroomLevel = couple.danceLevelBallroom || '';
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
            const latinLevel = coupleDiv.dataset.latinLevel;
            const ballroomLevel = coupleDiv.dataset.ballroomLevel;
            const names = coupleDiv.dataset.names ? coupleDiv.dataset.names.toLowerCase() : '';

            // Check all match conditions
            // Age group: Match if all age groups are selected, or the selected one is included in the item
            const ageGroupsMatch = ageGroupsFilter === 'all' || (ageGroups.length > 0 && ageGroups.includes(ageGroupsFilter));

            // Latin level: Match if all levels are selected, 
            // or the selected one equals the one of the item
            // or if no level is present and the selected one is 'none'.
            const latinLevelMatch = latinLevelFilter === 'all' || (latinLevel && latinLevel === latinLevelFilter) || (latinLevelFilter === 'none' && latinLevel == '');
            // Same for the ballroom level.
            const ballroomLevelMatch = ballroomLevelFilter === 'all' || (ballroomLevel && ballroomLevel === ballroomLevelFilter) || (ballroomLevelFilter === 'none' && ballroomLevel == '');

            const nameMatch = nameFilter === '' || names.includes(nameFilter);

            // Example of how to use these match conditions:
            const allMatch = ageGroupsMatch && latinLevelMatch && ballroomLevelMatch && nameMatch;

            // Apply filtering
            if (allMatch) {
                coupleDiv.style.display = 'block';
            } else {
                coupleDiv.style.display = 'none';
            }
        });
    }

    function downloadCSV() {
        // Get all visible couple items
        const selectedCouples = Array.from(document.querySelectorAll('.couple-item'))
            .filter(coupleDiv => coupleDiv.style.display !== 'none')
            .map(coupleDiv => {
                return {
                    firstnameLeader: coupleDiv.dataset.firstnameLeader || '',
                    lastnameLeader: coupleDiv.dataset.lastnameLeader || '',
                    firstnameFollower: coupleDiv.dataset.firstnameFollower || '',
                    lastnameFollower: coupleDiv.dataset.lastnameFollower || '',
                    ageGroups: coupleDiv.dataset.ageGroups ? JSON.parse(coupleDiv.dataset.ageGroups).join('; ') : '',
                    latinLevel: coupleDiv.dataset.latinLevel || '',
                    ballroomLevel: coupleDiv.dataset.ballroomLevel || ''
                };
            });

        // Prepare CSV data
        const csvRows = [];
        csvRows.push(['Firstname Leader', 'Lastname Leader', 'Firstname Follower', 'Lastname Follower', 'Age Groups', 'Latin Level', 'Ballroom Level']); // Header

        selectedCouples.forEach(couple => {
            csvRows.push([
                couple.firstnameLeader,
                couple.lastnameLeader,
                couple.firstnameFollower,
                couple.lastnameFollower,
                couple.ageGroups,
                couple.latinLevel,
                couple.ballroomLevel
            ]);
        });

        // Create CSV file and trigger download
        const csvContent = csvRows.map(row => row.join(',')).join('\n');
        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvBlob);

        const a = document.createElement('a');
        a.href = csvUrl;
        a.download = 'selected_couples.csv';
        a.click();
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

    document.getElementById('download-csv').addEventListener('click', downloadCSV);

    fetchCouples();
});