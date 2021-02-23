import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import { withTranslation } from '../i18'

const StorageLink = (props) => {
    const { path, t } = props
    const [link, setLink] = useState(undefined)
    useEffect(async () => {
        if (path) {
            const fileURL = await firebase.storage().ref().child(path).getDownloadURL()
            setLink(fileURL)
        }
    }, [])
    return (
        <a href={link} target='_blank'>{t('view-upload')} <span className='material-icons small'>launch</span></a>
    )
}

const PreviewData = (props) => {
    const { values, checkMembers, t } = props
    const member_data_name = [
        ['name', t('label.name')],
        ['school', t('label.school-name')],
        ['class', t('label.class-year')],
        ['tel', t('label.tel')],
        ['image', t('photo')],
        ['doc', t('school-doc')]
    ]

    function renderMemberData() {
        var elm = []
        for (var i = 0; i < 3; i++) {
            if (checkMembers[i]) {
                elm.push(<br />)
                elm.push(<h5>{t('member')} {i + 1}</h5>)
                for (const name of member_data_name) {
                    const fieldValue = values[`member_${i + 1}_${name[0]}`]
                    const fieldLabel = name[1]
                    if (name[0] === 'image' || name[0] === 'doc') {
                        elm.push(
                            <div><b>{fieldLabel}</b> <StorageLink key={i} t={t} path={fieldValue} />
                            </div>
                        )
                    }
                    else {
                        elm.push(<div><b>{fieldLabel}</b> {fieldValue}</div>)
                    }

                }
            }
        }
        return elm
    }
    return (
        <div className='alert alert-dark mt-3'>
            <div>
                <div><b>Email</b> {firebase.auth()?.currentUser?.email}</div>
                <div><b>{t('label.team-name')}</b> {values['team_name']}</div>
                <div><b>{t('label.register-type')}</b> {values['register_type']}</div>
                <br />
                <h5>{t('label.teacher-info')}</h5>
                <div><b>{t('label.name')}</b> {values['teacher_name']}</div>
                <div><b>{t('label.school-name')}</b> {values['teacher_school']}</div>
                <div><b>{t('label.tel')}</b> {values['teacher_tel']}</div>
                {renderMemberData()}
                <br />
                <h5>{t('pitching-idea')}</h5>
                <span>
                    <div><b>{t('label.pitching-paper')} </b>
                        {values['team_doc'] &&
                            <StorageLink t={t} path={values['team_doc']} />
                        }
                    </div>
                    <div><b>{t('label.presentation-vdo')} </b>
                        {values['video_url'] &&
                            <a href={values['video_url']} target='_blank'>{t('view-upload')} <span className='material-icons small'>launch</span></a>
                        }
                    </div>
                </span>
            </div>
        </div>
    )
}
export default withTranslation('common')(PreviewData)