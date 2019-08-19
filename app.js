let totalQ = 5;
    let marks = 2
    let counter = 0;
    let result =  ''
    let correct = 0;
    let incorrect = 0;
    let points = 0;
    let blank = 0;
    let position = 0;
    let page = 1;
    let userResponses = [];
    let answers = [];
    let clearID;
    let review;
    let gloss = document.querySelector('#explanation');
    let numQ = document.querySelector('#numQ');
    let explanation = [];
    let explanations = [
                        ['Pretoria is the administrative capital of South Africa', 'Cameroun won the AFCON in 1984, 1988, 2000, 2002 and recently in 2017', 'With about 1.4 billion people, China is the most populated country', "Modric is the 2018 FIFA Ballon d'Or holder", "With recent discoveries, Pluto is no longer classified as a planet"
                        ],
    
                        ["Envy is linked with Greed but Jealousy is linked with fear. You feel envy about something you don't own but want, but you feel jealous over something you already have but are scared to lose.", "When compliment you admire (praise, appreciate); when you complement something you make it better (improve, add to it)","Yoke is some form of bondage, burden or limiting condition and should not be confused with Yolk the yellow inner part of an egg", "Illusive: think illusion (imaginery doesn't exist); Elusive: Think elude (Something you can't get)", "All together: all in one place, everything present or all here; Altogether: Completely, all things considered, on the whole. <br> Now you know that Altogether is altogether different from all together"
                        ],

                        ["Recall BODMAS. So you should perform multiplication before Addition and subtraction. <br> 5 + 48 - 3 = 50", "Number of days => (4 * 12)/6 = 8 days", "Area = πr<sup>2</sup> => 154cm<sup>2</sup> = 22/7 * r<sup>2</sup> <br> => r = 7cm, D= 2*r =14cm <br> Perimeter = πD = 22/7 * 14cm = 44cm", "hyp = sqrt{opp<sup>2</sup> + adj<sup>2</sup>} <br> hyp = sqrt{(6cm)<sup>2</sup>+(8cm)<sup>2</sup>} = 10cm", "Observe the difference between nth term and n+1 term keeps increasing by 4 i.e. 3-2 = 1, 8-3 = 5, 17-8 = 9, 30-17=13, so the next difference should be 13 + 4 = 17. Hence, x => 30 + 17 = 43"
                        ]
                    ]
    const qArea = document.querySelector('#qArea')

    let questions = [   [
                            ["Where is the administrative capital of South Africa?", "Johannesburg","Pretoria","Durban","Cape Town", "B"],
                            ["Which country has won 5 AFCON titles?","Egypt","Ghana","Cameroun","Nigeria","C"],
                            ["Which is the most populated country in the world?","India","Brazil","Russia","China","D"],
                            ["Who is the current Balon d'Or winner?","Messi","Ronaldo","Mbappe","Modric","D"],
                            ["Which is not a planet?","Pluto","Mercury","Saturn","None of the above","A"]
                        ],
            
                        [
                            ["Emeka is ___________ of his friend's new social status. Thoughts of losing his girlfriend to a wealthy suitor makes him _____________", "jealous, envious","envious, jealous", "jealous, jealous", "envious, envious", "B"],
                            ["Pogba _____________ Kante's humility. He added, 'The french midfield worked so well because Kante and I __________ each other","Complimented, complemented", "Complemented, complimented", "complemented, complemented", "complimented, complimented", "A"],
                            ["Some _________ are self-inflicted but with knowledge they can be crushed like egg ________", "yolks, yolks", "yolks, yokes", "yokes, yokes", "yokes, yolks", "D"],
                            ["Efforts made by Science to find God have been __________. Hence, Science concludes that God is __________.", "elusive, illusive", "elusive, elusive","illusive, illusive", "illusive, ellusive", "A"],
                            ["We went to church ____________. _____________, church was fantastic", "all together, All together", "altogether, Altogether", "altogether, All together", "all together, Altogether", "D"]
                        ],      
                        
                        [
                            ["Evaluate 5 + 6 * 8 - 3", "50","85","35","55", "A"],
                            ["It takes 4 men 12 days to finish a job, how long will it take 6 men to finish the same job working at the same rate?", "18 days","10 days","8 days","How I one take know","C"],
                            ["Find the perimeter of a circle, if its area is 154cm<sup>2</sup>.","14cm","7cm","44cm","22cm","C"],
                            ["If adjacent and opposite sides of a right-angled triangle are 6cm and 8cm respectively, find the length of its third side?","14cm","10cm","7cm","9cm","B"],
                            ["Given this series 2, 3, 8, 17, 30, x. Find x?","43","59","45","47","D"]
                        ] 
                    ]         
            
    numQ.innerHTML = `<h3>Online Test</h3>`                
    qArea.innerHTML = `<input id="name" type="text" placeholder="Name" required/><label></label>
                    <br><br>
                    <select id="subjects">
                        <option value="GNS">GNS</option>
                        <option value="English" >English</option>
                        <option value="Maths" selected>Maths</option>
                    </select>
                    
                    <button id="next">Next</button>`

    const next = document.querySelector('#next')
    const subjects = document.querySelector('#subjects')
    const name = document.querySelector('#name');
    const timer = document.querySelector('#timer')
    let timerRunning = false;
    let seconds = 90
    const timeAlloted = seconds;
    
    
    
    const countDown = (index, userName)=>{
       
        timer.style.display = 'block';
        timer.innerHTML = `<span>${seconds}</span>`
        clearID = setInterval(()=>{ 
            if(seconds > 0){
                seconds--
                timer.innerHTML = `<span>${seconds}</span>`
            }
            else if(seconds == 0){
                calcScore(index, userName)
                clearInterval(clearID)
                position = -1;
            }
            if(seconds <= 30 && seconds > 0){    
                timer.classList.add('red')
            }      
        },1000)            
    }

    const countPoints = (index)=>{
        const options = document.querySelectorAll('input[name="options"]')
        let checked = 0
        
        options.forEach((option)=>{
            
            if(option.checked){ 
                checked ++
                userResponses.push(option.value)
                
                if(option.value == questions[index][position-1][questions[index][position-1].length-1]){
                    correct ++
                    points += marks;
                }else{
                    incorrect ++
                    points -= 0.5;
                } 
            }
        
        })    
            if(!checked){
                userResponses.push("")    
            }
    }

    const displayResult = (status, duration)=>{
        numQ.innerHTML = `<h4>Test Report</h4><br> `
        qArea.innerHTML = `<p><span style="font-weight: bold;font-size: 2em;">Score: ${result}%</span> <br><br> ${status} <br><br> You got ${correct} correct, ${incorrect} incorrect and left ${blank} unanswered. <br><br>Test completed in ${duration} seconds.</p> <button id="review" class="review">Review</button>`
        review = document.querySelector("#review")
        
    }

    const calcScore = (index, userName)=>{
        let status;
        clearInterval(clearID);
        const timeLeft = timer.querySelector('span').textContent;
        const duration = timeAlloted - timeLeft;
        countPoints(index);  
        result = parseInt(points / (marks * totalQ) * 100)
        blank = totalQ - (correct + incorrect)
        if (result < 50){
            status = `Sorry ${userName}, You failed! `
        }else{
            status = `Congratulations ${userName}, You passed!`
        }
        displayResult(status, duration)
    }


    const feedback = (position)=>{
        const options = document.querySelectorAll('input[name="options"]')
        let checked = 0
        options.forEach((option, index)=>{
            
            option.disabled = true;
            if(option.value == answers[position]){
                
                option.parentElement.classList.add('answer')
            }
            if(option.value == userResponses[position]){
                option.checked = true;
                
                if(option.value == answers[position]){
                    option.parentElement.nextElementSibling.classList.add('hit')
                }else{
                    option.parentElement.classList.add('wrong')
                    option.parentElement.nextElementSibling.classList.add('miss')
                } 
            }
        })    
        gloss.style.display = "block";
        gloss.innerHTML = explanation[position];
    }

    qArea.addEventListener('click',(event)=>{
            let subject = subjects.value;
            let index = subjects.selectedIndex;
            let userName = name.value;
            
        if(event.target.id == "next"){
            if(userName){
                if(page == 1){
                qArea.innerHTML = `<h2>Instructions:</h2>
                <li>You have ${totalQ} questions to answer in ${seconds} seconds.</li>
                <li>Wrong answers will be penalized; when in doubt leave it blank.</li>
                <li>Once you click on the Next button, you can't go back.</li>
                <li>Click Start to begin Test, Good luck!</li>
                    <button id="next">Start</button>`;
                    
                }else if(page >= 2 && page <7){
                    if(!timerRunning){
                        countDown(index, userName)
                        timerRunning = true;
                        for(let i=0; i<questions[index].length; i++){
                            explanation.push(explanations[index][i])
                            answers.push(questions[index][i][questions[index][i].length-1])
                        }  
                    }
                   
                    if(page > 2){
                            countPoints(index)
                        }
                        
                        numQ.innerHTML = `${subject}<br> <span>Question ${position+1} of ${totalQ}</span>`

                        qArea.innerHTML = `<p>${questions[index][position][0]}</p>
                            <ul>
                                <li><label><input type="radio" name="options" value="A"/>${questions[index][position][1]}</label></li>
                                <li><label><input type="radio" name="options" value="B"/>${questions[index][position][2]}</label></li>
                                <li><label><input type="radio" name="options" value="C"/>${questions[index][position][3]}</label></li>
                                <li><label><input type="radio" name="options" value="D"/>${questions[index][position][4]}</label></li>
                            </ul>
                            <button id="next">Next</button>`       
                            position++;

                }else if(page == 7){
                        calcScore(index, userName)         
                        position = -1            
                }
                page ++
            }else{
                name.classList.add('error')
                name.nextElementSibling.innerHTML = " <span style='color: red;'>Please Enter Your Name<span>"
            }
        }  
        else if(event.target.className == "review"){
            position++;
            if(position <= 4){
                numQ.innerHTML = `${subject}<br> <span>Question ${position+1} of ${totalQ}</span>`
                if(position == 0){
                    
                    qArea.innerHTML = `<p>${questions[index][position][0]}</p>
                <ul>
                    <li><label><input type="radio" name="options" value="A"/>${questions[index][position][1]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="B"/>${questions[index][position][2]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="C"/>${questions[index][position][3]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="D"/>${questions[index][position][4]}</label><span class="icon"></span></li>
                </ul>
                <button class="review">Next</button>`
                }
                
                else if(position < 4){
                    
                    qArea.innerHTML = `<p>${questions[index][position][0]}</p>
                <ul>
                    <li><label><input type="radio" name="options" value="A"/>${questions[index][position][1]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="B"/>${questions[index][position][2]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="C"/>${questions[index][position][3]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="D"/>${questions[index][position][4]}</label><span class="icon"></span></li>
                </ul>
                <button class="back">Previous</button> <button class="review">Next</button>`}
                
                else if(position == 4){
                    
                    qArea.innerHTML = `<p>${questions[index][position][0]}</p>
                <ul>
                    <li><label><input type="radio" name="options" value="A"/>${questions[index][position][1]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="B"/>${questions[index][position][2]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="C"/>${questions[index][position][3]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="D"/>${questions[index][position][4]}</label><span class="icon"></span></li>
                </ul>
                <button class="back">Previous</button>`
                }
                 feedback(position)      
            } 
            
        }else if(event.target.className == "back"){
    
            if(position > 0){
                
                position --
                numQ.innerHTML = `${subject}<br> <span>Question ${position+1} of ${totalQ}</span>`
                if(position == 0){
                    
                    qArea.innerHTML = `<p>${questions[index][position][0]}</p>
                <ul>
                    <li><label><input type="radio" name="options" value="A"/>${questions[index][position][1]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="B"/>${questions[index][position][2]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="C"/>${questions[index][position][3]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="D"/>${questions[index][position][4]}</label><span class="icon"></span></li>
                </ul>
                <button class="review">Next</button>`
                }
                
                else if(position < 4){
                    
                    qArea.innerHTML = `<p>${questions[index][position][0]}</p>
                <ul>
                    <li><label><input type="radio" name="options" value="A"/>${questions[index][position][1]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="B"/>${questions[index][position][2]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="C"/>${questions[index][position][3]}</label><span class="icon"></span></li>
                    <li><label><input type="radio" name="options" value="D"/>${questions[index][position][4]}</label><span class="icon"></span></li>
                </ul>
                <button class="back">Previous</button> <button class="review">Next</button>`}
                feedback(position)
            }
            
        }
        
    })
        
    