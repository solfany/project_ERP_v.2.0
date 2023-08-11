package com.project.backend.service;

import com.project.backend.dto.CalendarEventDto;
import com.project.backend.entity.CalendarEvent;
import com.project.backend.repository.CalendarEventRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
public class CalendarEventService {

    private final CalendarEventRepository calendarEventRepository;

    @Autowired
    public CalendarEventService(CalendarEventRepository calendarEventRepository) {
        this.calendarEventRepository = calendarEventRepository;
    }

    public CalendarEvent CreateCalendarEvent(CalendarEventDto calendarEventDto) {
        CalendarEvent calendarEvent = calendarEventDto.toEntity(); // 수정된 부분
        calendarEventRepository.save(calendarEvent);

        return calendarEvent;
    }

    public ResponseEntity<String> DeleteCalendarEvent(Long eventId) {
        try {
            Optional<CalendarEvent> calendarEventOptional = calendarEventRepository.findById(eventId);

            if (calendarEventOptional.isPresent()) {
                CalendarEvent calendarEvent = calendarEventOptional.get();
                calendarEventRepository.delete(calendarEvent);
                return ResponseEntity.ok("Event deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete event");
        }
    }
}