package com.project.backend.controller;

import com.project.backend.dto.CalendarEventDto;
import com.project.backend.entity.CalendarEvent;
import com.project.backend.repository.CalendarEventRepository;
import com.project.backend.service.CalendarEventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendarevents")
public class CalendarEventController {

    private final CalendarEventRepository calendarEventRepository;
    private final CalendarEventService calendarEventService;


    public CalendarEventController(CalendarEventRepository calendarEventRepository, CalendarEventService calendarEventService) {
        this.calendarEventRepository = calendarEventRepository;
        this.calendarEventService = calendarEventService;
    }

    @GetMapping
    public List<CalendarEvent> getAllEvents() {
        return calendarEventRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> CreateCalendarEvent(@RequestBody CalendarEventDto calendarEventDto) {
        try {
            // Event를 추가하는 CreateCalendarEvent 메서드 호출
            CalendarEvent createdEvent = calendarEventService.CreateCalendarEvent(calendarEventDto);
            // 이후 추가된 이벤트를 갱신하기 위해 findAll() 메서드 실행
            calendarEventRepository.findAll();

            return ResponseEntity.ok("일정이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("일정을 저장하는 도중 오류가 발생했습니다.");
        }
    }

    // calendarEventId를 전달받아서 해당 이벤트를 지우는 DeleteCalendarEvent 메서드 실행
    @DeleteMapping("/delete/{calendarEventId}")
    public ResponseEntity<String> deleteCalendarEvent(@PathVariable Long calendarEventId) {
        try {
            ResponseEntity<String> deleteCalendarEvent = calendarEventService.DeleteCalendarEvent(calendarEventId);
            return ResponseEntity.ok("일정이 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("일정을 삭제하는 도중 오류가 발생했습니다.");
        }
    }

}