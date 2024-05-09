import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(): boolean {

    const storedDateStr = localStorage.getItem("tokenTime");

    // בדיקה אם התאריך קיים ב-local storage
      // המרת התאריך ממחרוזת לאובייקט תאריך
      const storedDate = new Date(storedDateStr);
      // קבלת התאריך הנוכחי
      const currentDate = new Date();

      // חישוב הזמן בין התאריכים בשעות
      const timeDiffInHours = (currentDate.getTime() - storedDate.getTime()) / (1000 * 60 * 60);
      if (timeDiffInHours>5) {
        Swal.fire({
          title: 'אין לך הרשאה',
          text: 'עליך להתחבר בכדי להיכנס למערכת',
          icon: 'warning',
        });
        return false;
      }
    return true;

  }
}