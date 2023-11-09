import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { config } from '../../config';

import { Snackbar, Alert } from '@mui/material';

export function CoursesInputs({ session, index, onChange }) {
    const data = session.account.courses.find(course => course.course_id === index);

    const [course, setCourse] = useState(data?.course ?? "");
    const [institution, setInstitution] = useState(data?.institution ?? "");
    const [workLoad, setWorkLoad] = useState(data?.workLoad ?? "");
    const [conclusionYear, setConclusionYear] = useState(data?.conclusionYear ?? new Date().getFullYear());

    useEffect(() => {
        onChange({
            index,
            course,
            institution,
            workLoad,
            conclusionYear
        });
    }, [onChange, index, course, institution, workLoad, conclusionYear]);

    return (
        <div className="row">

            { index > 0 && <div className="col-12 mt-1 mb-4" >
                <hr />
            </div> }
            
            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor={"curso-" + index}>Curso</label>
                <input required type="text" id={"curso-" + index} className="form-control form-control-md" value={course} onChange={(e) => setCourse(e.target.value)} />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor={"instituicao-" + index}>Instituição</label>
                <input required type="text" id={"instituicao-" + index} className="form-control form-control-md" value={institution} onChange={(e) => setInstitution(e.target.value)} />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor={"cargaHoraria-" + index}>Carga horária</label>
                <input required type="number" id={"cargaHoraria-" + index} className="form-control form-control-md" placeholder="Quantidade de horas" value={workLoad} onChange={(e) => setWorkLoad(e.target.value)} />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor={"anoConclusao-" + index}>Ano de conclusão</label>
                <input required type="number" id={"anoConclusao-" + index} className="form-control form-control-md" value={String(conclusionYear)} onChange={(e) => setConclusionYear(Number(e.target.value.slice(0, 4)))} />
            </div>
        </div>
    );
}

CoursesInputs.propTypes = {
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
}

export default function CoursesForm({ session, updateSession }) {
    const [coursesCount, setCoursesCount] = useState(Math.max(Math.min(session.account.courses.length, 2), 1));
    const coursesData = Array(coursesCount).fill({});

    const [isSnackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");

    const handleSumbit = async (e) => {
        e.preventDefault();

        e.target.querySelector("button[type='submit']").disabled = true;

        await fetch(`${config.api}${config.endpoints.account.update.courses}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(coursesData)
        });

        setSnackMessage("Informações salvas com sucesso!");
        setSnackSeverity("success");
        setSnackOpen(true);

        updateSession();

        e.target.querySelector("button[type='submit']").disabled = false;
    }

    const addMoreExperiences = () => {
        if (coursesCount >= 2)
            return;

        coursesData.push({});
        setCoursesCount(n => n + 1);
    }

    return (
        <form className="w-100 row" onSubmit={handleSumbit}>
            {
                Array(coursesCount).fill().map(
                    (_, index) => <CoursesInputs session={session} index={index} key={index} onChange={(data) => coursesData[data.index] = data} />
                )
            }

            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-between flex-column flex-md-row">
                        <button className="btn btn-block col-12 col-md-4 mb-3 mb-md-0" style={{ border: "dashed 1px #dee2e6" }}
                            id="addMore" type="button" disabled={coursesCount >= 2} onClick={addMoreExperiences}>Adicionar mais</button>
                        <button className="btn button-create btn-block text-white border-0 col-12 col-md-4 " type="submit">Salvar</button>
                    </div>
                </div>
            </div>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={isSnackOpen}
                autoHideDuration={6000}
                onClose={() => setSnackOpen(false)}
            >
                <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: '90%' }}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </form>
    )
}

CoursesForm.propTypes = {
    session: PropTypes.object.isRequired,
    updateSession: PropTypes.func.isRequired
}