import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function AgeCalculator() {
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [age, setAge] = useState({});

    useEffect(() => {
        const calculateAge = () => {
            const birthDate = moment(dateOfBirth, "YYYY-MM-DD");
            const now = moment();
            // const duration = moment.duration(now.diff(birthDate));

            setAge({
                years: isNaN(now.diff(birthDate, "years")) ? "" : now.diff(birthDate, "years").toString(),
                months: isNaN(now.diff(birthDate, "months")) ? "" : now.diff(birthDate, "months").toString(),
                weeks: isNaN(now.diff(birthDate, "weeks")) ? "" : now.diff(birthDate, "weeks").toString(),
                days: isNaN(now.diff(birthDate, "days")) ? "" : now.diff(birthDate, "days").toString(),
                hours: isNaN(now.diff(birthDate, "hours")) ? "" : now.diff(birthDate, "hours").toString(),
                minutes: isNaN(now.diff(birthDate, "minutes")) ? "" : now.diff(birthDate, "minutes").toString(),
                seconds: isNaN(now.diff(birthDate, "seconds")) ? "" : now.diff(birthDate, "seconds").toString(),
                milliseconds: isNaN(now.diff(birthDate, "milliseconds")) ? "" : now.diff(birthDate, "milliseconds").toString(),
            });
        };

        calculateAge();
        const intervalId = setInterval(calculateAge, 1000);

        return () => clearInterval(intervalId);
    }, [dateOfBirth]);

    return (
        <div className="container-wrapper">
            <div className="container">
                <h2 className="text-center mb-4">Age Calculator</h2>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <p>Enter Your Life Subscription Activation Date:</p>
                        <input type="date" className="form-control mb-3 calendar" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} max={moment().format("YYYY-MM-DD")} />
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text">In Years: {age.years}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text">In Months: {age.months}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text">In Weeks: {age.weeks}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text">In Days: {age.days}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text">In Hours: {age.hours}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text">In Minutes: {age.minutes}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text">In Seconds: {age.seconds}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text">In Milliseconds: {age.milliseconds}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgeCalculator;
