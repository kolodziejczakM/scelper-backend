const config = require('../configurations/config');

exports.getOptions = () => {
    return {
        from: '"SCELPER.COM" <administracja@scelper.com>',
        subject: 'Potwierdzenie dodania zlecenia',
        text: '',
        attachments: [{
            filename: 'scelper-logo.png',
            path: './public/assets/scelper-logo.png',
            cid: 'rejestracja@scelper.com-logoPicture'
        }, {
            filename: 'scelper-mail.png',
            path: './public/assets/scelper-mail.png',
            cid: 'rejestracja@scelper.com-mailPicture'
        }]
    };
};

exports.getHTML = (deleteCode, activationLink) => {
    return `
<style>
    /* Shrink Wrap Layout Pattern CSS */
    @media only screen and (max-width: 599px) {
        td[class="hero"] img {
            display: block;
            margin: 0 auto;
            height: auto !important;
        }
        td[class="pattern"] td{
            width: 100%;
        }
    }
</style>

<table cellpadding="0" cellspacing="0">
    <tr>
        <td class="pattern" width="600">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td class="hero">
                        <img src="cid:rejestracja@scelper.com-mailPicture" alt="scelper.com" style="display: block; border: 0;" />
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-family: arial,sans-serif; color: #333;">
                        <h1 style="color: #666;">Już prawie!</h1>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-family: arial,sans-serif; font-size: 14px; line-height: 20px !important; color: #666; padding-bottom: 20px;">
                       Twoje zlecenie pojawi się na stronie po tym jak klikniesz w link aktywacyjny.
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-family: arial,sans-serif; font-size: 14px; line-height: 20px !important; color: #666; padding-bottom: 20px;">
                       Klikając w link aktywacyjny potwierdzasz, że zapoznałeś się z 
                       <a href="${config.productionRootURL}/documents/Scelper-regulamin.pdf">regulaminem serwisu Scelper.com</a>.
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-family: arial,sans-serif; font-size: 14px; line-height: 20px !important; color: #666; padding-bottom: 20px;">
                       Wsparcie jest dla nas ważne. Dziękujemy.
                    </td>
                </tr>
                 <tr>
                    <td align="left" style="font-family: arial,sans-serif; font-size: 14px; line-height: 20px !important; color: #666; padding-bottom: 20px;">
                       <b>Link aktywacyjny: ${activationLink} </b>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-family: arial,sans-serif; font-size: 14px; line-height: 20px !important; color: #666; padding-bottom: 20px;">
                        Aby usunąć swoje zlecenie wejdź na scelper.com i skorzystaj z kodu usunięcia: 
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-family: arial,sans-serif; font-size: 14px; line-height: 20px !important; color: #666; padding-bottom: 20px;">
                       <b>Kod usunięcia: ${deleteCode} </b>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-family: arial,sans-serif; font-size: 14px; line-height: 20px !important; color: #666; padding-bottom: 20px;">
                       Jeśli uważasz, że ta wiadomość nie powinna do Ciebie trafić, prosimy o kontakt.  
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-family: arial,sans-serif; font-size: 14px; line-height: 20px !important; color: #666; padding-bottom: 20px;">
                       Zespół Scelper.com
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <a href="#"><img src="cid:rejestracja@scelper.com-logoPicture" style="display: block; border: 0;" /></a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
};
